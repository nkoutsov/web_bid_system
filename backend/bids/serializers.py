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
    # auctions = serializers.PrimaryKeyRelatedField(many=True, queryset=Auction.objects.all(),allow_null=True)
    # sent = Sent(many=True,allow_null=True,required=False)
    # inbox = Inbox(many=True,allow_null=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'],afm=validated_data['afm'],phone=validated_data['phone'],address=validated_data['address'])
        return user
    class Meta:
        model = SUser
        fields = ['url','username','password', 'email','id','afm','phone','address','is_superuser','is_active','is_staff']


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
        # auctions = serializers.PrimaryKeyRelatedField(many=True, queryset=Auction.objects.all())
        bidder = serializers.ReadOnlyField(source="bidder.username")
        class Meta:
            model = Bid
            fields = ['id','bidder','time','amount','auction']

class AuctionSerializer(serializers.ModelSerializer):
        seller = serializers.ReadOnlyField(source='seller.username')
        bid = serializers.ReadOnlyField(source='bid.amount')
        category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(),many=True)
        winner = serializers.SlugRelatedField(slug_field='username',queryset=SUser.objects.all(),allow_null=True)
        class Meta:
            model = Auction
            fields = ['id','active','name','seller','winner','category','currently','buy_price','first_bid','number_of_bids','bid','location','country','started','ends','description']