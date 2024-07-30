from rest_framework import views, response, permissions, exceptions, status as rest_status
from .serializers import FarmSerializer, ProductSerializer
from .services import create_user, user_email_selector, create_token, add_product, get_product, get_product_detail, delete_product, update_product
from .authentication import CustomUserAuthentication

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

class RegisterApi(views.APIView):
    def post(self, request):
        serializer = FarmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        serializer.instance = create_user(user_dc=data)
        
        
        return response.Response(data=serializer.data)

# we want to authenticate a user and store user's session inside a cookie
# so that way validation and authentification are done in backend 
class LoginApi(views.APIView):
    @method_decorator(ensure_csrf_cookie)   # TODO: PROVJERITI DA LI NAM OVO TREBA
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        
        user = user_email_selector(email=email)
        
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')
        
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed('Invalid Password')
        
        token = create_token(user_id=user.id)
        
        resp = response.Response()
        resp.set_cookie(key="jwt", value=token, httponly=True)
        
        return resp


# this endpoint will be used if user is authenticated
class UserApi(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        user = request.user
        
        serializer = FarmSerializer(user)
        
        return response.Response(serializer.data)
    

class LogoutApi(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")
        resp.data = {"message":"vidimo se uskoro!"}
        
        return resp
    
class ListProducts(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        product_collection = get_product(user=request.user)
        serializer = ProductSerializer(product_collection, many=True)
        
        return response.Response(serializer.data)
    
class AddProduct(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        
        serializer.instance = add_product(user=request.user, product=data)
    
        return response.Response(data=serializer.data)


class GetProduct(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, status_id):
        status = get_product_detail(user=request.user, status_id=status_id)
        serializer = ProductSerializer(status)
        return response.Response(serializer.data)
    

class DeleteProduct(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def delete(self, request, status_id):
        delete_product(user=request.user, status_id=status_id)
        return response.Response(rest_status.HTTP_204_NO_CONTENT)
    
    
class UpdateProduct(views.APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def put(self, request, status_id):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        status = serializer.validated_data
        serializer.instance = update_product(user=request.user, status_id=status_id, product_data=status)
        
        return response.Response(serializer.data)
    
# TODO: ZAMJENITI ID S UUID