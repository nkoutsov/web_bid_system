from django.db import models
from django.contrib.auth.models import User as BasicUser

class User(BasicUser) :
    # maybe id required
    phone = models.IntegerField()
    address = models.CharField(max_length = 50)
    afm = models.IntegerField()

class Category(models.Model):
    name = models.CharField(max_length = 50)

class Bidder(User):
    rating = models.DecimalField()
    location = models.CharField(max_length = 50)
    country = models.CharField(max_length = 50)


class Bid(models.Model):
    bidder = models.ForeignKey(User)
    time = models.DateTimeField()


class Auction(models.Model):
    item_id = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    category = models.ManyToManyField(Category)
    currently = models.DecimalField()
    buy_price = models.DecimalField()
    first_bid = models.DecimalField()
    number_of_bids = models.IntegerField()
    bid = models.OneToManyField(Bid)
    location = models.CharField(max_length = 300)
    country = models.CharField(max_length = 50)
    started = models.DateTimeField()
    ends = models.DateTimeField()
    seller = models.ForeignKey(User)
    description = models.CharField(max_length = 500)
