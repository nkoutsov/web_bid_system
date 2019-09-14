from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from bids.serializers import UserSerializer, GroupSerializer, AuctionSerializer,BidSerializer,CategorySerializer,MessageSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from bids.models import Auction,Bid,Category,Message
from bids.models import User as Suser
from django_filters import rest_framework as filters
from rest_framework import permissions
from bids.permissions import IsOwnerOrReadOnly
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from django.contrib.auth.middleware import get_user
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework.decorators import api_view
from rest_framework_jwt.utils import jwt_payload_handler
import jwt
import backend.settings as settings
from django.contrib.auth.signals import user_logged_in
@api_view(['POST'])
def authenticate_user(request):

    try:
        username = request.data['username']
        password = request.data['password']
 
        user = Suser.objects.get(username=username)
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                # user_details['name'] = "%s %s" % (
                #     user.first_name, user.last_name)
                user_details['JWT'] = token
                user_logged_in.send(sender=user.__class__,
                                    request=request, user=user)
                return Response(user_details, status=status.HTTP_200_OK)
 
            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)

class AuctionFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="currently", lookup_expr='lte')
    description = filters.CharFilter(field_name='description',lookup_expr='icontains')

    class Meta:
        model = Auction
        fields = ['category', 'description', 'max_price','location']

class UserFilter(filters.FilterSet):
    class Meta:
        model = Suser
        fields = ['is_active','is_staff']

# @ensure_csrf_cookie
# @method_decorator(ensure_csrf_cookie, name='dispatch')
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Suser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter

# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all().order_by('-time')
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]
    #                   IsOwnerOrReadOnly]

    def perform_create(self,serializer):
        user = self.request.user
        serializer.save(bidder=user)

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
    #                   IsOwnerOrReadOnly]

    def get_queryset(self):
        return Auction.objects.filter(seller=self.request.user)

class AuctionList(generics.ListCreateAPIView):
    queryset = Auction.objects.filter(active=True).order_by('-started')
    serializer_class = AuctionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AuctionFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # jwt_authentication = JSONWebTokenAuthentication()
        # if jwt_authentication.get_jwt_value(self.request):
        #     user, jwt = jwt_authentication.authenticate(self.request)
        serializer.save(seller=self.request.user)
    
    def get_queryset(self):
        won=self.request.GET.get('won',False)
        if(won):
            return Auction.objects.filter(winner=self.request.user)
        return Auction.objects.filter(active=True).order_by('-started')

        
class BidsDetail(generics.ListCreateAPIView):
    serializer_class = BidSerializer
    lookup_field = 'auction'
    permission_classes = [permissions.IsAuthenticated] #,IsOwnerOrReadOnly]

    def get_queryset(self):
        auction_id = self.request.GET.get('a',"")
        ac = get_object_or_404(Auction, pk=auction_id)
        return Bid.objects.filter(auction=ac).order_by('-amount')

class AuctionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
                    #   IsOwnerO/rReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


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

class MessageRUD(generics.RetrieveUpdateAPIView):
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


