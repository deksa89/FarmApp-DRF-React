# OPG-app

I made this little CRUD app as a part of job evaluation process in CARNET. It is built with Django and allows users to create, view, update and delete farm products once a user is registered.


## Features
- First you have to register yourself by typing first and last name, farm name, phone, email and a password
- Users can create a new farm product by clicking the `Dodaj proizvod` button and entering a product, choose its category and add product description.
- Users can view all products on the home page.
- Users can check a product details by clicking on `Detaljno` link to see product description.
- Users can edit a product by clicking the `Uređivanje` link.
- Users can delete a task by clicking the `Obriši` button next to a task.


## Installation

- Clone this repository: git clone https://github.com/deksa89/OPG-app.git
- Install the required dependencies: `pip install -r requirements.txt`
- It is recommended to create virtual environment where you would install Django and all the dependencies needed to run the app
- You also need to install postgresql but if you can also use sqlite, just uncomment it in settings.py
- Once virutal environment is created you have to start it and install Django and its dependencies
- Run the app: `python manage.py runserver`
- Open the app in your web browser at `http://localhost:8000`


## Dependencies

- Python 3.10.12
- Django 5.0.3
