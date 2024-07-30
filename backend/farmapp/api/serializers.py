from rest_framework import serializers
from ..models import Farm, Product
from . import services

class FarmSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ime = serializers.CharField()
    prezime = serializers.CharField()
    naziv_opg = serializers.CharField()
    adresa = serializers.CharField()
    telefon = serializers.IntegerField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        
        return services.FarmDataClass(**data)
    
class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    category = serializers.ChoiceField(choices=Product.CATEGORY_CHOICES)
    detail = serializers.CharField(style={'base_template': 'textarea.html'})
    farm = FarmSerializer(read_only=True)
    
    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        
        return services.ProductDataClass(**data)