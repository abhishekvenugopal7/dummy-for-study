from .models import Student
from .serialzers import StuudentSerializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

class Pagination(PageNumberPagination):
    page_size=5

class StudentView(viewsets.ModelViewSet):
    queryset=Student.objects.all()
    serializer_class=StuudentSerializers
    # permission_classes=[IsAuthenticated]
    pagination_class=Pagination
    ordering_fields=["age"]
    def get_queryset(self):
        super().get_queryset()
        queryset=Student.objects.all()
        name=self.request.query_params.get("name")
        age=self.request.query_params.get("age__gt")
        if name:
            queryset=queryset.filter(name__icontains=name)
        if age:
            queryset=queryset.filter(age__gt=age)    

        return queryset

