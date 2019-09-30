from django.contrib.auth.models import User as BUser
from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import User as SUser
from .models import *

class Sent(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        if user.is_authenticated:
            return Message.objects.filter(sender=user)
        return []


class Inbox(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        if user.is_authenticated:
            return Message.objects.filter(receiver=user)
        return []

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source="sender.username")
    receiver = serializers.SlugRelatedField(queryset = SUser.objects.all(),slug_field="username")

    class Meta:
        model = Message
        fields = ['id','text','receiver','sender','date_sent','read']

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'],afm=validated_data['afm'],phone=validated_data['phone'],address=validated_data['address'],location=validated_data['location'],country=validated_data['country'])
        return user
    class Meta:
        model = SUser
        fields = ['url','username','password', 'email','id','afm','phone','address','is_superuser','is_active','is_staff','location','country']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = Category
            fields = ['id','name']


class BidSerializer(serializers.ModelSerializer):
        bidder = serializers.ReadOnlyField(source="bidder.username")
        bidderId = serializers.ReadOnlyField(source="bidder.id")
        bidderCountry = serializers.ReadOnlyField(source="bidder.country")
        bidderLocation = serializers.ReadOnlyField(source="bidder.location")
        class Meta:
            model = Bid
            fields = ['id','bidder','time','amount','auction','bidderId','bidderCountry','bidderLocation']

class AuctionSerializer(serializers.ModelSerializer):
        seller = serializers.ReadOnlyField(source='seller.username')
        sellerId = serializers.ReadOnlyField(source='seller.id')
        bid = serializers.ReadOnlyField(source='bid.amount')
        category = serializers.SlugRelatedField(slug_field='name',queryset=Category.objects.all(),many=True)
        class Meta:
            model = Auction
            fields = ['id','active','photo','name','seller','is_started','category','currently','buy_price','first_bid','number_of_bids','bid','location','country','started','ends','description','sellerId']

class RecommendationSerializer(serializers.ModelSerializer):
    auction = serializers.PrimaryKeyRelatedField(queryset=Auction.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=SUser.objects.all())
    class Meta:
        model = Recommendation
        fields = ['id', 'auction', 'user', 'score']