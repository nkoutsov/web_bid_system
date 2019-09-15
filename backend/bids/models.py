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
    location = models.CharField(max_length = 50,null=True)
    country = models.CharField(max_length = 50,null=True)

class Category(models.Model):
    name = models.CharField(max_length = 50)

class Bidder(User):
    rating = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    #location = models.CharField(max_length = 50)
    #country = models.CharField(max_length = 50)




class Auction(models.Model):
    active = models.BooleanField(default=False)
    name = models.CharField(max_length = 50)
    category = models.ManyToManyField(Category)
    currently = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    buy_price = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    first_bid = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    number_of_bids = models.IntegerField(default = 0)
    location = models.CharField(max_length = 300)
    country = models.CharField(max_length = 50,default = 'Greece')
    started = models.DateTimeField(auto_now_add=True)    
    ends = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="auctions") # change models.CASCADE to PROTECT
    winner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="won_auctions",null=True)
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

# -*- coding: utf-8 -*-

from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.utils.deprecation import MiddlewareMixin
from django.conf import LazySettings
from django.contrib.auth.middleware import get_user
from django.contrib.auth.models import AnonymousUser

# settings = LazySettings()
import jwt
import traceback

def get_user_jwt(request):
    print("****************************")
    """
    Replacement for django session auth get_user & auth.get_user
     JSON Web Token authentication. Inspects the token for the user_id,
     attempts to get that user from the DB & assigns the user on the
     request object. Otherwise it defaults to AnonymousUser.

    This will work with existing decorators like LoginRequired  ;)

    Returns: instance of user object or AnonymousUser object
    """
    user = None
    try:
        print(user_jwt)
        print("#######################")
        user_jwt = JSONWebTokenAuthentication().authenticate(Request(request))
        print(user_jwt)
        print("#######################")
        if user_jwt is not None:
            # store the first part from the tuple (user, obj)
            user = user_jwt[0]
    except:
        pass

    return user or AnonymousUser()

class AuthenticationMiddlewareJWT(MiddlewareMixin):
    def process_request(self, request):
        request.user = SimpleLazyObject(lambda: get_user_jwt(request))

