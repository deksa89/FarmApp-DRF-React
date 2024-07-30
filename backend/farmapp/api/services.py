import dataclasses
import datetime
import jwt
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import exceptions

from ..models import Farm, Product
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..models import Farm, Product

@dataclasses.dataclass
class FarmDataClass:
    ime: str
    prezime: str
    naziv_opg: str
    adresa: str
    telefon: int
    email: str
    password: str = None
    id: int = None
    
    @classmethod
    def from_instance(cls, user: "Farm"):
        return cls(
            ime=user.ime,
            prezime=user.prezime,
            naziv_opg=user.naziv_opg,
            adresa=user.adresa,
            telefon=user.telefon,
            email=user.email,
            id=user.id
            )
        
        
def create_user(user_dc: "FarmDataClass"):
    instance = Farm(
        ime = user_dc.ime,
        prezime = user_dc.prezime,
        naziv_opg = user_dc.naziv_opg,
        adresa = user_dc.adresa,
        telefon = user_dc.telefon,
        email = user_dc.email
    )
    
    if user_dc.password is not None:
        instance.set_password(user_dc.password)
    
    instance.save()
    
    return FarmDataClass.from_instance(instance)


def user_email_selector(email: str):
    user = Farm.objects.filter(email=email).first()
    
    return user


def create_token(user_id: int):
    payload = dict(
        id=user_id,
        exp=datetime.datetime.now() + datetime.timedelta(hours=24),
        iat=datetime.datetime.now()
    )
    
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
    
    return token


@dataclasses.dataclass
class ProductDataClass:
    name: str
    category: str
    detail: str
    farm: FarmDataClass = None
    id: int = None
    
    @classmethod
    def from_instance(cls, product: "Product"):
        return cls(
            name=product.name,
            category=product.category,
            detail=product.detail,
            id=product.id,
            farm = product.farm
            )
        
def add_product(user, product: "ProductDataClass"):
    product_create = Product.objects.create(
        name=product.name,
        category=product.category,
        detail=product.detail,
        farm = user
    )
    return ProductDataClass.from_instance(product_create)


def get_product(user: "Farm"):
    user_product = Product.objects.filter(farm=user)
    
    return [ProductDataClass.from_instance(product) for product in user_product]


def get_product_detail(user: "Farm", status_id: int):
    status = get_object_or_404(Product, pk=status_id)
    
    return ProductDataClass.from_instance(status)


def delete_product(user: "Farm", status_id: int):
    status = get_object_or_404(Product, pk=status_id)
   
    status.delete()
    

def update_product(user: "Farm", status_id: int, product_data: "ProductDataClass"):
    status = get_object_or_404(Product, pk=status_id)
    status.name = product_data.name
    status.category = product_data.category
    status.detail = product_data.detail
    status.save()
    
    return ProductDataClass.from_instance(status)
