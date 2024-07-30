from django.urls import path
from django.contrib.auth.views import LoginView
from . import views
from .forms import CustomAuthenticationForm


urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('register/', views.register, name='register'),
    path('login/', LoginView.as_view(authentication_form=CustomAuthenticationForm, template_name='farmapp/login.html'), name='login'),
    path('logout/', views.product_logout, name='logout'),
    path('product/<uuid:product_id>/', views.product_details, name='product_details'),
    path('list_products/', views.list_products, name="list_products"),
    path('add_product/', views.add_product, name="add_product"),
    path('edit_product/<uuid:product_id>/', views.edit_product, name='edit_product'),
    path('delete_product/<uuid:product_id>/', views.delete_product, name='delete_product'),
    path('profile/', views.view_profile, name='view_profile'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
]