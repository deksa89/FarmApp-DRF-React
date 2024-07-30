from django.urls import path
from .views import RegisterApi, LoginApi, UserApi, LogoutApi, AddProduct, ListProducts, GetProduct, DeleteProduct, UpdateProduct

urlpatterns = [
    path('register/', RegisterApi.as_view(), name='register'),
    path('login/', LoginApi.as_view(), name='login'),
    path('auth/', UserApi.as_view(), name='auth'),
    path('logout/', LogoutApi.as_view(), name='logout'),
    path('list_products/', ListProducts.as_view(), name='list_products'),
    path('add_product/', AddProduct.as_view(), name='add_product'),
    path('get_product/<int:status_id>', GetProduct.as_view(), name='get_product'),
    path('delete_product/<int:status_id>', DeleteProduct.as_view(), name='delete_product'),
    path('update_product/<int:status_id>', UpdateProduct.as_view(), name='update_product')
]