from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from bids.serializers import UserSerializer, GroupSerializer, AuctionSerializer,BidSerializer,CategorySerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from bids.models import Auction,Bid,Category
from bids.models import User as Suser
from django_filters import rest_framework as filters
from rest_framework import permissions
from bids.permissions import IsOwnerOrReadOnly

# Create your views here.

class AuctionFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="currently", lookup_expr='lte')
    description = filters.CharFilter(field_name='description',lookup_expr='icontains')

    class Meta:
        model = Auction
        fields = ['category', 'description', 'max_price']


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Suser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class AuctionList(generics.ListCreateAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AuctionFilter

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

class AuctionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

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