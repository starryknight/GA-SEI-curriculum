[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Authentication in Django

## Prerequisites

* Python
* Django
* Virtual Environments

## Objectives

By the end of this, developers should be able to:

* Implement Authentication in Django
* Make some routes require login

## Introduction

Authentication comes built in to Django, so there's no need for something like
Passport! The built-in authentication system will handle user accounts, groups,
and permissions. There are also some view-helpers for common authentication
related forms. The default configuration will work great for most projects, but
Django's authentication system is also flexible and adaptable for larger
projects.

The Django authentication system handles both authentication and authorization.
What's the difference?

* Authentication: verifying a user is who they say they are
* Authorization: determining what a user is allowed to do

We'll start by integrating Authentication and include Authorization at the end
of the lesson.

## Authentication

Authentication comes built in to Django, so all we have to do is configure it.
What a relief!

Django's auth lives inside the module `django.contrib.auth` and is by default
uses the `User` object. Setting up login/logout functionality is really
straightforward, so we'll start there. After that, we'll implement signing users
up.

## Login Views

While we can build out our on views and templates for logging users in and out
of our application (i.e. do it by hand), Django offers us helpers that make it
much easier:

In the base project url config (`tunr_django/urls.py`) let's add the following:

```python
from django.urls import path
from django.conf.urls import include
from django.contrib import admin

urlpatterns = [
    path('artist/', include('tunr.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
]
```

Django provides us with a set of pre-made
[authentication views](https://docs.djangoproject.com/en/2.0/topics/auth/default/#module-django.contrib.auth.views).
That one line replaces all of these:

```python
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
```

Only a few things are changing here: we are importing the auth views and then
adding urls for them. This will give us all of the login/logout functionality!

> Run the server and navigate to `http://localhost:8000/accounts/login/`

Let's add a login form. Let's create a new template folder in `tunr/templates`
called `registration` (following Django convention). Let's add a `login.html`
file within our new directory. The form should look like this:

```html
{% extends 'tunr/base.html' %} {% block content %}
<h2>Login</h2>
<form method="post">
  {% csrf_token %} {{ form.as_p }} <button type="submit">Login</button>
</form>
{% endblock %}
```

Let's update our `base.html` `<nav>` element to link to the login page if a user
is not signed in and the logout page if the user is signed in:

```html
<nav>
  <a href="/songs">Songs</a> <a href="/">Artists</a>
  <div class="user-info">
    {% if user.is_authenticated %} Welcome, {{ user.username }}
    <a href="{% url 'logout' %}">Signout</a> {% else %}
    <a href="{% url 'login' %}">Login</a> {% endif %}
  </div>
</nav>
```

The `user` variable is accessible to us in any template in Django. We just have
to check if the user is authenticated to determine which link is rendered. The
`is_authenticated` property is set automatically, so all we have to do is check
and see if it's truthy or not.

We should have access to this `user` object anywhere in our templates. Take a
look at all the (other properties we have access to [ here ](https://docs.djangoproject.com/en/2.1/ref/contrib/auth/#django.contrib.auth.models.User))

Final step! Let's edit our configuration in `tunr_django/settings.py` to
determine which page logged in users should be redirected to:

```python
LOGIN_REDIRECT_URL = ''
```

This constant says that when a user logs in, we want them to go to the
"artist_list" view.

Now try to login! You can use the same username and password you created for the
Django admin panel!

> Did you forget your password to the admin panel? run
> `manage.py changepassword <user_name>` to update it!

## Django Makes It Easy!

We've implemented a page for logging in and logging out, which is a great first
step for our user authentication. Now, we just have to implement the following
views and templates:

* Change Password
* Change Password Confirmation
* Reset Password
* Reset Password Confirmation

Seems like a lot. Also seems like something most applications would need. Maybe
Django makes that easy somehow... it does!

Try going to:

```
localhost:8000/accounts/password_change
```

## Signing Up

At the moment, all users have to be created through the admin panel. This seems
like an odd default for an authentication system, but it has to do with how the
`User` object works. Django doesn't make any distinction between instances of
the `User` class, so all users (including superusers) are instances of the
`User` class. Because of this, we have to be careful with how we assign
privileges!
[Read more about it here](https://docs.djangoproject.com/en/2.0/topics/auth/default/#id6).

Implementing user-friendly sign up is similar to performing CRUD on any other
model, with some Django helpers to make it easier. Django's auth system includes
a form class for creating users, called `UserCreationForm`. We'll then use the
`create_user`, `login`, and `authenticate` methods in our views.

First, let's update our `urlpatterns` in `tunr_django/urls.py`:

Add this to the top of the file:

```python
from tunr import views as tunr_views
```

And add this to the `urlpatterns` list:

```python
path('accounts/signup/', tunr_views.sign_up, name='signup'),
```

We're importing the views from our `tunr` app and adding a url for
`accounts/signup` that will use a `sign_up` view function we're about to create.

Next, open up your `tunr/views.py`. Add the following to the top of the file:

```python
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
```

And add the following view function:

```python
def sign_up(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('artist_list')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})
```

We're first importing the `login` and `authenticate` authentication helper
methods, as well as the `UserCreationForm` class (the class for the form for
creating new users).

After that, we're defining our `sign_up` view function. If the user is making a
`GET` request, then we'll create an instance of the `UserCreationForm` class and
render it in the `registration/signup.html` template. If the user is making a
`POST` request (i.e. they're submitting the user creation form), then we're
checking to make sure the form is valid and saving it. Once it's saved, we're
pulling the username and password from the form and using `authenticate` to
authenticate the new user. Once the user is authenticated, we log them in with
the `login` method.

## Authorization

Now let's make it a requirement to be logged in to see some views -- maybe the
create, update and delete ones. Add the following to the top of `tunr/views.py`:

```python
from django.contrib.auth.decorators import login_required
```

This will allow us to use what is called a `decorator` on our chosen functions.
A decorator is a function called on a function in order to change its behavior.
In this case, it adds an if statement to each function: if the user is logged in
continue with the view logic, if not then redirect to the login page. Let's look
at the syntax for using them:

```python
@login_required
def artist_create(request):
    if request.method == 'POST':
        form = ArtistForm(request.POST)
        if form.is_valid():
            artist = form.save()
            return redirect('artist_detail', pk=artist.pk)
    else:
        form = ArtistForm()
    return render(request, 'tunr/artist_form.html', {'form': form})
```

All we added was the `@login_required`!

Go ahead and add it to the five other views we want secured!

## Making sure authentication works

Now let's log out of the system and see if we can visit those routes that we've
marked as `login_required`.

At the homepage, we see the list of artists. This is great, and should work.

Click the `(+)` next to the `Artists` header. What happens?

Now back up and click on an artist. You should be able to see the detail about
that artist (photo and a list of songs).

Click on `(edit)` next to the artist name. What happens?

Now login using your admin username/password, then try and do the same things.

PRETTY NEATO RIGHT?! So much easier than express and passport.

Another cool thing - if you're logged out and try to visit a protected route,
django prompts you to login, then redirects you back to the original route you
were trying to access. Very nice!

![borat](https://media.giphy.com/media/l0ErFafpUCQTQFMSk/giphy.gif)

## Social Authentication

Social Authentication is using social media platforms (like Facebook and
Twitter) for your authentication. For the remainder of class, work on getting
social authentication working in tunr using
[`social-auth-app-django`](https://github.com/python-social-auth/social-app-django).

Use the [documentation](https://python-social-auth.readthedocs.io/en/latest/configuration/django.html) or
[this walkthrough](https://simpleisbetterthancomplex.com/tutorial/2016/10/24/how-to-add-social-login-to-django.html).

## Additional Resources

* [User Authentication in Django](https://docs.djangoproject.com/en/2.0/topics/auth/)
* [Using the Django Authentication system](https://docs.djangoproject.com/en/2.0/topics/auth/default/)
* [How to Create User Sign Up View](https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html#basic-sign-up)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
