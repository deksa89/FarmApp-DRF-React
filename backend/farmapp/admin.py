from django.contrib import admin
from .models import Product, Farm

# Register your models here.
# admin.site.register(Farm)
# admin.site.register(Product)

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'ime',
        'prezime',
        'naziv_opg',
        'adresa',
        'telefon',
        'email'
    )
    
admin.site.register(Farm, UserAdmin)
admin.site.register(Product)