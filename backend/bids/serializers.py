from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Auction


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class AuctionSerializer(serializers.ModelSerializer):
    # item_id = serializers.CharField(read_only = True)
    # name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    # currently = serializers.DecimalField(decimal_places = 2,max_digits = 10)
    # buy_price = serializers.DecimalField(decimal_places = 2,max_digits = 10)
    # first_bid = serializers.DecimalField(decimal_places = 2,max_digits = 10)
    # number_of_bids = serializers.IntegerField()
    # location = serializers.CharField(max_length = 300)
    # country = serializers.CharField(max_length = 50)
    # started = serializers.DateTimeField()    
    # ends = serializers.DateTimeField()
    # # seller = models.ForeignKey(User)
    # description = serializers.CharField(max_length = 500)

    # def create(self,validated_data):
    #     return Auction.objects.create(**validated_data)
    
    # def update(self,instance,validated_data):
    #     instance.name = validated_data.get('name',instance.name)
    #     instance.location = validated_data.get('location',instance.location)
    #     instance.description = validated_data.get('description',instance.description)
    #     instance.save()
    #     return instance
        class Meta:
            model = Auction
            fields = ['id','name','category','currently','buy_price','first_bid','number_of_bids','location','country','started','ends','description']