from django.db import models
from django.contrib.auth.models import User as BasicUser

class User(BasicUser) :
    # maybe id required
    phone = models.IntegerField()
    address = models.CharField(max_length = 50)
    afm = models.IntegerField()

# class Category(models.Model):
#     name = models.CharField(max_length = 50)

# class Bidder(User):
#     rating = models.DecimalField()
#     location = models.CharField(max_length = 50)
#     country = models.CharField(max_length = 50)


# class Bid(models.Model):
#     bidder = models.ForeignKey(User)
#     time = models.DateTimeField()
#     amount = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)


class Auction(models.Model):
    item_id = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    # category = models.ManyToManyField(Category)
    currently = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    buy_price = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    first_bid = models.DecimalField(default = 0,decimal_places = 2,max_digits = 10)
    number_of_bids = models.IntegerField(default = 0)
    # bid = models.OneToManyField(Bid)
    location = models.CharField(max_length = 300)
    country = models.CharField(max_length = 50,default = 'Greece')
    started = models.DateTimeField(auto_now_add=True)    
    ends = models.DateTimeField(auto_now_add=True)
    # seller = models.ForeignKey(User)
    description = models.CharField(max_length = 500,default = 'Empty')


# from bids.models import Auction
# from bids.serializers import AuctionSerializer