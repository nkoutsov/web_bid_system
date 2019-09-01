from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = Category
            fields = ['id','name']

class BidderSerializer(serializers.ModelSerializer):
        class Meta:
            model = Bidder
            fields = ['id','rating','location','country']

class BidSerializer(serializers.ModelSerializer):
        class Meta:
            model = Bid
            fields = ['id','bidder','time','amount']

class AuctionSerializer(serializers.ModelSerializer):
        class Meta:
            model = Auction
            fields = ['id','name','category','currently','buy_price','first_bid','number_of_bids','bid','location','country','started','ends','description']