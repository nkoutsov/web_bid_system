from django.urls import path
from bids import views

urlpatterns = [
    path('bids/', views.AuctionList.as_view()),
    path('bids/<int:pk>/', views.AuctionDetail.as_view()),
]