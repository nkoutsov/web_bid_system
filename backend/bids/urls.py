from django.urls import path
from bids import views
from rest_framework import routers
from django.urls import include, path
from django.conf.urls import url


router = routers.DefaultRouter()
router.register(r'bidds', views.BidViewSet)
router.register(r'cats', views.CategoryViewSet)
router.register(r'inactive',views.PendingUsersViewSet)
router.register(r'active',views.ActiveUsersViewSet)
router.register(r'myauctions', views.AuctionViewSet)
#router.register(r'export', views.AdminAuctionViewSet)
router.register(r'reco', views.RecommendationViewSet)

urlpatterns = [
    path('bids/', views.AuctionList.as_view()),
    path('bids/<int:pk>/', views.AuctionDetail.as_view()),
    path('bids/detail/', views.BidsDetail.as_view()),
    path('', include(router.urls)),
    url('^messages/(?P<action>.+)/$', views.Messages.as_view()),
    path('message/<int:pk>/', views.MessageRUD.as_view()),
    path('export/',views.exportView),
    path('validate_username/',views.validateUsername)
]
