[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Django REST Framework

The Django apps we've built so far have used server-side rendering and Django's
built-in templating language to generate HTML. But what if we want to use Django
to create an API?

We can do so with the [Django REST Framework](https://www.django-rest-framework.org/).

## Prerequisites

* Django
* Understanding of REST and APIs

## Objectives

By the end of this, developers should be able to:

* Install and use Django REST Framework
* Implement an API in Django

## Introduction

So far, we have written full-stack Django applications that use Django's builtin
templating language to write our applications. When we are building applications
in Django that use front end frameworks or have live updating data, we have to
use an API for our back end applications. Today, we are going to learn how to
convert our Tunr application we have been working on to a JSON API using
a package called Django REST Framework.

This is similar to how we converted our MEHN stack app to the MERN stack:
instead of the API returning rendered HTML (using handlebars), we had it return
JSON.

## Review: APIs (5 min / 0:10)

<details>
  <summary><strong>What is an API?</strong></summary>

> API stands for "Application Programming Interface." While it technically
> applies to all of software design, the term has come to refer to web
> applications that respond with JSON, XML, or some other raw data format

</details>

<details>

<summary><strong>What tools and libraries do we use to access other
APIs from within our programs?</strong></summary>

> [JavaScript's fetch
> method](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch),
> [Axios](https://github.com/axios/axios), or any other means of doing HTTP
> requests, like [Postman](https://www.getpostman.com/)

</details>

<details>
  <summary><strong>What information do we need to provide in order to be able to retrieve information from an API? What about for modifying data in an API?</strong></summary>

> In order to "GET" or "DELETE" information, we need to provide a `url`, `type`,
> (HTTP method) and `dataType` (API data format).  In order to "POST" or "PUT",
> we also need to provide some `data`.

> Example:

```js
fetch('/artists', {
  method: 'POST',
  body: JSON.stringify({
    artist: {
      name: 'Limp Bizkit',
      nationality: 'USA',
      photo_url: 'http://nerdist.com/wp-content/uploads/2014/12/limp_bizkit-970x545.jpg'
    }
  })
})
.then((response) =>  response.json())
.then((response) => {
  console.log(response)
})
```

</details>

## JSON Responses in Django (15 min / 0:25)

Using Django's built-in `JsonResponse`, we can send dictionaries or lists as
JSON objects in Django without installing any libraries. It will even generate
an administrator interface for you to interact with your API in the browser - so
no need to use Postman!

For example:

```py
# views.py
from django.http import JsonResponse

def artist_detail(request):
    data = {
        'name': 'Kanye',
        'photo_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg/1920px-Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg',
        'nationality': 'USA'
    }
    return JsonResponse(data)
```

We could also convert our QuerySet of data from our database to a list and then
send that as a JsonResponse. Note: you could also use a serializer to convert it
to a dictionary and send the data that way.

```py
# views.py
from django.http import JsonResponse

def artist_list(request):
    artists = Artist.objects.all().values('name', 'nationality', 'photo_url') # only grab some attributes from our database, else we can't serialize it.
    artists_list = list(artists) # convert our artists to a list instead of QuerySet
    return JsonResponse(artists_list, safe=False) # safe=False is needed if the first parameter is not a dictionary.
```

This method of sending JSON responses is very similar to what we did in Express;
however, there is a more expressive way of doing this using Django REST
Framework.

## Django REST Framework

Django REST framework is a package that works nicely with Django's base
functionality. It has a lot of advantages over just sending a JSON response, not
to mention a nice interface. It will even generate an administrator interface
for you to interact with your API in the browser - so no need to use Postman! It
is also very customizable, so if you want to change how your API renders, you
can probably do it!

It is also very widely used - it is used by Mozilla, Red Hat, Heroku, 
Eventbrite, Instagram, Pinterest, and BitBucket. An increasingly popular stack
among startups is: Django Rest Framework for the back end and React for the front
end!

## Installation and Configuration (15 min / 0:40)

Lets install the `djangorestframework` and save it to your `requirements.txt`
file so future developers know to install it as well.

Lets go ahead and start a new Django project to track our favorite meals and their ingredients. 

```bash
django-admin startproject meals_api
cd meals_api
```

```bash
pip install Django djangorestframework
django-admin startapp meals
```

Also, we will need to add `meals` and `rest_framework` to our `INSTALLED_APPS` list in our `settings.py` so that we can
use it within our project.

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'meals'
]
```

Further down in your `settings.py` file, you can configure Django REST Framework to
require authentication to create, update, or delete items using your API.
Unauthorized users will still be able to perform read actions on your data. This
is all the configuration that you need to set up these permissions!

```python
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
```

> If you would like to use JWT in your Django REST framework app, [Django REST
> framework JWT](http://getblimp.github.io/django-rest-framework-jwt/) is
> awesome and has in-depth documentation on getting it setup. If you are using
> a front-end framework for your Django application, this is probably the way to
> go!

Lets migrate and add some models! 

```python
#models.py 
from django.db import models

class Meal(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    vegetarian = models.BooleanField(default=False)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, blank=True, null=True, related_name="ingredients")
    
    def __str__(self):
        return self.name
```

```
./manage.py makemigrations
./manage.py migrate
```

## Serializers (20 min / 1:00)

[ Serializers ](https://www.django-rest-framework.org/api-guide/serializers/)
allow us to convert our data from QuerySets (the data type returned by Django's
ORM) to data that can easily be converted to JSON (or XML) and rendered to our
API. There are several types of serializers built into Django REST framework;
however, we will be using the `HyperlinkedModelSerializer` today. This
serializer allows us to specify model fields that we want to include in our API
and it will generate our JSON accordingly. It will also allow us to link from
one model to another.

> Read more about [ Serializers in the documentation](https://www.django-rest-framework.org/api-guide/serializers/)

In this case, we want all of the fields from the Meal model in our serializer,
so we will include all of them in our `fields` tuple.

We will create a new file in the root of our `meals` app folder, called
`serializers.py` to hold our serializer class.

```py
from rest_framework import serializers 
from .models import Meal

class MealSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    class Meta:
        model = Meal
        fields = ('id', 'name', 'ingredients')
```

The  `Meta` class within our `Meal` serializer class specifies meta data about
our serializer. In this class, the model it serializes and the fields we want to
serialize. Also, we are creating a `HyperlinkedRelatedField`. This allows us to
link one model to another using a hyperlink. The `view-name` specifies the name
of the view given in the `urls.py` file.

### You Do: Create a Serializer for Ingredients (10 min / 1:10)

> 5 min exercise, 5 min review

In the serializers file, add a second serializer for the Ingredient class. Again,
include all of the fields from the model in your API.

> Bonus: Try out a different
> [serializer](http://www.django-rest-framework.org/api-guide/serializers) to
> relate your models!

## Break (10 min / 1:20)

## Views (20 min / 1:40)

Django REST framework has a bunch of utility functions and classes for
implementing sets of views in Django. Instead of creating each view
individually, Django REST framework can create multiple views for us in a few
lines of code.

The documentation on the views and utilities that DRF provides for generating
Views is great:

* [Class-based views](https://www.django-rest-framework.org/api-guide/views/)
* [Generic views](https://www.django-rest-framework.org/api-guide/generic-views/)
* [ViewSets](https://www.django-rest-framework.org/api-guide/viewsets/)

For example, we can use the `ModelViewSets` to create all of our CRUD function on our data model with just about 2 lines of code!

```py
# views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import Meal
from .serializers import MealSerializer

class MealView(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
```

> Note: we aren't rendering to any templates

### You Do: Add Views for the Indgredients (10 min / 1:50)

Add in the views for the Ingredients. 

## URLs (20 min / 2:10)

Since Django can handle multiple request types in one view and using one url, we
just need to set up two routes: one for the single view and one for the list
view.

```py
# languages/urls.py
from django.urls import path, include 
from . import views 
from rest_framework import routers

router = routers.DefaultRouter()
router.register('meals', views.MealsView)

urlpatterns = [
    path('', include(router.urls))
]
```

Finally we need to update the urls in our root directory. 

Lets add `path('', include('meals.urls'))` right below the `/admin` path.

Also lets add `include` to the django.urls import. We can just replace that line with `from django.urls import path, include `

### You Do: Add URLs for the Ingredients Views (10 min / 2:20)

Add in the urls for the Ingredients views. 

## Testing! (10 min / 2:30)

Now let's hit the urls we just built out and see what happens.

* `http://localhost:8000/meals/`
* `http://localhost:8000/meals/1`
* `http://localhost:8000/ingredients/1`

To do the following you will need to use [drf-extensions](https://chibisov.github.io/drf-extensions/docs/)
* `http://localhost:8000/meals/1/ingredients/1`

![](product.png)

## Additional Resources

* [Django REST Framework](https://www.django-rest-framework.org/)
* [DRF Extensions](https://chibisov.github.io/drf-extensions/docs/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
