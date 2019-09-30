from django.shortcuts import render,get_object_or_404
from django.contrib.auth.models import User, Group
from django_filters import rest_framework as filters
from django.contrib.auth.middleware import get_user
from django.http import HttpResponse

from rest_framework import viewsets,permissions,status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.decorators import api_view

from bids.serializers import * 
from bids.models import Auction,Bid,Category,Message,Recommendation
from bids.models import User as Suser
from bids.permissions import IsOwnerOrReadOnly

import backend.settings as settings
from datetime import *

# bonus
from sklearn.neighbors import KDTree
import numpy as np

@api_view(['POST'])
def validateUsername(request):
    username = request.data['username']
    if Suser.objects.filter(username=username).count() > 0:
        return HttpResponse(False)
    return HttpResponse(True)


@api_view(['GET'])
def exportView(request):
    auctions = Auction.objects.all()[0:200]
    xml = "<Items>\n"
    for a in auctions:
        xml += '\t<Item ItemID=\"' + str(a.id) + '\">\n\t\t'
        xml += '<Name> ' + a.name + " </Name>\n\t\t"
        for c in a.category.all():
            xml += "<Category> " + c.name + " </Category>\n\t\t"
        
        xml += "<Currently> " + str(a.currently) + " </Currently>\n\t\t"
        xml += "<First_Bid> " + str(a.first_bid) + " </First_Bid>\n\t\t"
        xml += "<Number_of_Bids> " + str(a.bids.all().count()) + " </Number_of_Bids>\n\t\t"
        xml += "<Bids>"

        for b in a.bids.all():
            xml += "\n\t\t\t <Bid> \n\t\t\t\t "
            xml += "<Bidder UserID=\"" + b.bidder.username + "\">\n\t\t\t\t\t"
            xml += "<Location> " + b.bidder.location + " </Location>\n\t\t\t\t\t"
            xml += "<Country> " + b.bidder.country + " </Country>\n\t\t\t\t</Bidder>\n\t\t\t\t"
            xml += "<Time> " + str(b.time) + " </Time>\n\t\t\t\t"
            xml += "<Amount> " + str(b.amount) + " </Amount>\n\t\t\t</Bid>"
        
        xml += "\n\t\t</Bids>\n\t\t"
        xml += "<Location> " + a.location + " </Location>\n\t\t"
        xml += "<Country> " + a.country + " </Country>\n\t\t"
        xml += "<Started> " + str(a.started) + " </Started>\n\t\t"
        xml += "<Ends> "  + str(a.ends) + " </Ends>\n\t\t"
        xml += "<Seller UserID=\"" + a.seller.username + "\">\n\t\t"
        xml += "<Description> " + a.description + " </Description>\n\t"
        xml += "</Item>\n"
    xml += "</Items>"
    return HttpResponse(xml)

class AuctionFilter(filters.FilterSet):
    max_price = filters.NumberFilter(field_name="currently", lookup_expr='lte')
    description = filters.CharFilter(field_name='description',lookup_expr='icontains')

    class Meta:
        model = Auction
        fields = ['category', 'description', 'max_price','location']

class UserFilter(filters.FilterSet):
    class Meta:
        model = Suser
        fields = ['is_active','is_staff']

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Suser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all().order_by('-time')
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self,serializer):
        user = self.request.user
        serializer.save(bidder=user)
        #bonus
        auction_id = serializer.data.get('auction')
        a = Auction.objects.get(pk=auction_id)
        amount = float(serializer.data.get('amount'))

        if a.buy_price != None and float(a.buy_price)>0 and amount>=float(a.buy_price):
            a.active = False
            a.winner = user
            a.save()
            if a.winner != None:
                m = Message(sender=a.seller,receiver=a.winner,text="Congratulations, you have just won auction: "+a.name)
                m.save()


        if a.currently < amount:
            a.currently = amount
            a.save()
        try:
            obj = Recommendation.objects.get(user=self.request.user,auction=Auction.objects.get(id=auction_id))
            obj.score += 5
            obj.save()
        except Recommendation.DoesNotExist:
            obj = Recommendation.objects.create(auction=Auction.objects.get(id=auction_id),user=self.request.user,score=5)
        # serializer.save()

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Auction.objects.filter(seller=self.request.user)


class AuctionList(generics.ListCreateAPIView):
    queryset = Auction.objects.filter(active=True).order_by('-started')
    serializer_class = AuctionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AuctionFilter
    parser_class = (FormParser,MultiPartParser,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        first_bid = float(serializer.validated_data.get('first_bid'))
        serializer.save(seller=self.request.user,currently=first_bid)
    
    def get_queryset(self):
        # Check if an active auction ended
        for a in Auction.objects.filter(active=True):
            if datetime.now() > a.ends.replace(tzinfo=None):
                a.active = False
                bids = a.bids.all().order_by("-amount")
                winner = None
                if bids.count()>0:
                    winner = bids[0].bidder
                a.winner = winner
                a.save()
                if a.winner != None:
                    m = Message(sender=a.seller,receiver=a.winner,text="Congratulations, you have just won auction: "+a.name)
                    m.save()

        won=self.request.GET.get('won',False)
        notStarted = self.request.GET.get('nstarted',False)
        if(notStarted):
            return Auction.objects.filter(is_started=False,seller=self.request.user)
        if(won):
            return Auction.objects.filter(winner=self.request.user)
        return Auction.objects.filter(active=True).order_by('-started')

        
class BidsDetail(generics.ListCreateAPIView):
    serializer_class = BidSerializer
    lookup_field = 'auction'
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        auction_id = self.request.GET.get('a',"")
        ac = get_object_or_404(Auction, pk=auction_id)
        return Bid.objects.filter(auction=ac).order_by('-amount')

class AuctionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get(self,request,pk,format=None):
        #bonus
        auction_id = pk
        try:
            obj = Recommendation.objects.get(user=self.request.user,auction=Auction.objects.get(id=auction_id))
            obj.score += 1
            obj.save()
        except Recommendation.DoesNotExist:
            obj = Recommendation.objects.create(auction=Auction.objects.get(id=auction_id),user=self.request.user,score=1)
        return super().get(self, request)

# used for export
class AdminAuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAdminUser]

# used for bonus
class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def recommend(self):
        # load user ids
        users = []
        for x in Suser.objects.all().values_list('id'):
            users.append(x[0])
        users = sorted(users)

        # load auction ids
        auctions = []
        for x in Auction.objects.filter(active=True).values_list('id'):
            auctions.append(x[0])
        auctions = sorted(auctions)

        # load scores for each user X auction [userXauction]
        userId_to_scoreArray = {}
        for usr in users:
            scoreArray = []
            for auction in auctions:
                score = 0
                try:
                    score = float(Recommendation.objects.get(user=Suser.objects.get(id=usr),\
                            auction=Auction.objects.get(id=auction)).score)
                except Recommendation.DoesNotExist:
                    pass
            
                scoreArray.append(score)
                userId_to_scoreArray[usr] = scoreArray

        scoresArray = []
        for usrid in users:
            scoresArray.append(userId_to_scoreArray.get(usrid))
        
        X = np.array([x for x in scoresArray])
        kdt = KDTree(X, leaf_size=30, metric='euclidean')
        top2 = kdt.query(X, k=len(users)-1, return_distance=False)
        
        # get user's
        top = top2[0]
        for x in top2:
            if users[x[0]] == self.request.user.id:
                top = x

        finalAuctionsScore = []
        for x in range(len(auctions)):
            finalAuctionsScore.append(0)

        for id in top:
            score = scoresArray[id]
            for index in range(len(score)):
                finalAuctionsScore[index] += score[index]

        # sort lists together based on scores (finalAuctionsScore and auctions)
        sortedAuctions = [x for _,x in sorted(zip(finalAuctionsScore, auctions), reverse=True)]

        return [Auction.objects.get(id=x) for x in sortedAuctions]

    def get_queryset(self):
        return self.recommend()

class Messages(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        action = self.kwargs['action']

        if action=='inbox' and user.is_authenticated:
            return Message.objects.filter(receiver=user).order_by("-date_sent")
        elif action=='sent' and user.is_authenticated:
            return Message.objects.filter(sender=user).order_by("-date_sent")
        return Message.objects.all().order_by("-date_sent") #filter(sender=user)
    
    def perform_create(self,serializer):
        serializer.save(sender=self.request.user)

class MessageRUD(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    permission_classes = [permissions.IsAuthenticated]


# We don't need them now
class PendingUsersViewSet(viewsets.ModelViewSet):
    queryset = Suser.objects.filter(is_active=False,is_staff=False)
    serializer_class = UserSerializer

class ActiveUsersViewSet(viewsets.ModelViewSet):
    queryset = Suser.objects.filter(is_active=True,is_staff=False)
    serializer_class = UserSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.seller == request.user


