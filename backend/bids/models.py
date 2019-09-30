from django.db import models
from django.contrib.auth.models import AbstractUser as BasicUser
from django.dispatch import receiver
from django.db.models.signals import post_save  
from django.conf import settings
from django.utils import timezone

now = timezone.now

class User(BasicUser) :
    phone = models.IntegerField(null=True)
    address = models.CharField(max_length = 50,null=True)
    afm = models.IntegerField(null=True)
    is_active = models.BooleanField(default=False)
    location = models.CharField(max_length = 50,null=True)
    country = models.CharField(max_length = 50,null=True)

class Category(models.Model):
    name = models.CharField(max_length = 50)


class Auction(models.Model):
    photo = models.ImageField(blank=True,null=True)
    active = models.BooleanField(default=False)
    name = models.CharField(max_length = 50)
    category = models.ManyToManyField(Category)
    currently = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    buy_price = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10,blank=True,null=True)
    first_bid = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    number_of_bids = models.IntegerField(default = 0)
    location = models.CharField(max_length = 300)
    country = models.CharField(max_length = 50,default = 'Greece')
    started = models.DateTimeField(default=now,null=True,blank=True)
    is_started = models.BooleanField(default=False)    
    ends = models.DateTimeField(default=now)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="auctions") # change models.CASCADE to PROTECT
    winner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="won_auctions",null=True,blank=True)
    description = models.CharField(max_length = 500,default = 'Empty')

class Bid(models.Model):
    bidder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    time = models.DateTimeField()
    amount = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE,related_name="bids",null=True)

class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="sent")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="inbox")
    text = models.CharField(max_length = 500)
    date_sent = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

#bonus
class Recommendation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    score = models.DecimalField(default = 0,decimal_places = 6,max_digits = 10)
