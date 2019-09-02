from django.urls import path
from bids import views
from rest_framework import routers
from django.urls import include, path


router = routers.DefaultRouter()
router.register(r'bidds', views.BidViewSet)
router.register(r'cats', views.CategoryViewSet)

urlpatterns = [
    path('bids/', views.AuctionList.as_view()),
    path('bids/<int:pk>/', views.AuctionDetail.as_view()),
    path('', include(router.urls)),
]