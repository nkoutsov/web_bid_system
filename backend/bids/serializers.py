from django.contrib.auth.models import User as BUser
from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import User as SUser
from .models import *


class UserSerializer(serializers.ModelSerializer):
    auctions = serializers.PrimaryKeyRelatedField(many=True, queryset=Auction.objects.all())
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'],afm=validated_data['afm'],phone=validated_data['phone'],address=validated_data['address'])
        return user
    class Meta:
        model = SUser
        fields = ['url','username','password', 'email','id','afm','phone','address','is_superuser','auctions','is_active','is_staff']


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
        auctions = serializers.PrimaryKeyRelatedField(many=True, queryset=Auction.objects.all())
        class Meta:
            model = Bid
            fields = ['id','bidder','time','amount','auctions']

class AuctionSerializer(serializers.ModelSerializer):
        seller = serializers.ReadOnlyField(source='seller.username')
        bid = serializers.ReadOnlyField(source='bid.amount')
        category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(),many=True)
        class Meta:
            model = Auction
            fields = ['id','name','seller','category','currently','buy_price','first_bid','number_of_bids','bid','location','country','started','ends','description']