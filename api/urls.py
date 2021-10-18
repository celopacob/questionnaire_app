from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'questionnaire', views.PersonAnswerViewSet)
router.register(r'persons', views.PersonViewSet)
router.register(r'stream-services', views.StreamServiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]