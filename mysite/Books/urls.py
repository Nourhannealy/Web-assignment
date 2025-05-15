from django.urls import path
from . import views  # Import your views

urlpatterns = [
    # Book URLs
    path('', views.admin_add_book, name='book-Add'),
    ] 