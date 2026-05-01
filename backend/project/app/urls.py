from django.urls import path


from rest_framework.routers import DefaultRouter
from .views import StudentView
router=DefaultRouter()
router.register("student",StudentView)

urlpatterns=router.urls