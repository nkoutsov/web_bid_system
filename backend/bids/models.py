from django.db import models
from django.contrib.auth.models import AbstractUser as BasicUser
from django.dispatch import receiver
from django.db.models.signals import post_save  
from django.conf import settings

class User(BasicUser) :
    phone = models.IntegerField(null=True)
    address = models.CharField(max_length = 50,null=True)
    afm = models.IntegerField(null=True)
    is_active = models.BooleanField(default=False)

class Category(models.Model):
    name = models.CharField(max_length = 50)

class Bidder(User):
    rating = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    location = models.CharField(max_length = 50)
    country = models.CharField(max_length = 50)


class Bid(models.Model):
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField()
    amount = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)


class Auction(models.Model):
    name = models.CharField(max_length = 50)
    category = models.ManyToManyField(Category)
    currently = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    buy_price = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    first_bid = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    number_of_bids = models.IntegerField(default = 0)
    bid = models.ForeignKey(Bid, on_delete=models.CASCADE,related_name="auctions",null=True)
    location = models.CharField(max_length = 300)
    country = models.CharField(max_length = 50,default = 'Greece')
    started = models.DateTimeField(auto_now_add=True)    
    ends = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="auctions") # change models.CASCADE to PROTECT
    description = models.CharField(max_length = 500,default = 'Empty')
