from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required

from .models import Product, Farm
from .forms import ProductForm, CustomUserCreationForm, EditUserProfileForm


def welcome(request):
    return render(request, 'farmapp/welcome.html')

@login_required
def list_products(request):
    user_profile = Farm.objects.get(user=request.user)
    products = Product.objects.filter(farm=user_profile)
    return render(request, 'farmapp/product_list.html', {'products': products, 'user_profile': user_profile})


@login_required
def add_product(request):
    user_farm = Farm.objects.get(user=request.user)
    
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save(commit=False)
            product.farm = user_farm
            product.save()
            return redirect('list_products')
    else:
        form = ProductForm()

    return render(request, 'farmapp/add_product.html', {'form': form})

@login_required
def product_details(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'farmapp/product_details.html', {'product': product})


@login_required
def edit_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if product.farm.user != request.user:
        return redirect('list_products')

    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('list_products') 
    else:
        form = ProductForm(instance=product)

    return render(request, 'farmapp/add_product.html', {'form': form, 'product': product})

@login_required
def delete_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    return redirect('list_products')

@login_required
def view_profile(request):
    user_profile = Farm.objects.get(user=request.user)
    return render(request, 'farmapp/profile.html', {'user_profile': user_profile})


@login_required
def edit_profile(request):
    profile = get_object_or_404(Farm, user=request.user)

    if request.method == 'POST':
        form = EditUserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('view_profile')
    else:
        form = EditUserProfileForm(instance=profile)

    return render(request, 'farmapp/edit_profile.html', {'form': form})


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.save()
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'farmapp/register.html', {'form': form})


def product_logout(request):
    logout(request)
    return redirect('login')