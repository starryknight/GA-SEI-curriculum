[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express: Views

When we're building full stack applications, we're controlling the
`request-response` cycle that we discussed back in Intro to Node. As part of
that cycle, our server *has* to send some kind of response - even if it's to let
the client know there was an error. Our response is the meaningful data that our
user needs (based on their request) to continue interacting with our
application. For us, that means sending HTML.

Within the Model-View-Controller pattern, this part is called the View. The View
in MVC is the part of the application that the user interacts with using their
browser. By rendering a view, our users can continue to interact with our app.

## Prerequisites

* HTML
* Node and npm
* MVC
* Express routing, models and queries

## Objectives

By the end of this, developers should be able to:

* Describe views and how they relate to the rest of MVC
* Discuss the key features of templating
* Write views using Handlebars
* Define some view logic (i.e. `if` and `each`)
* Work with forms in views
* Send `PUT` and `DELETE` requests with `method-override`
* Work with partials to make our views more modular

## Introduction

As developers working on a large application, we want to use tools that will
make our lives easier. That's one reason why we're using Express! Rather than
build and maintain our server by hand, we're going to use a framework that makes
it a little easier. Same with Mongoose: rather than write "raw" MongoDB queries,
we're going to use an ODM that makes working with the data in our database
a little easier.

Handlebars is going to take that philosphy in making our lives easier to our views.

Templating lets us be modular and programmatic when building our views.
Templating languages (i.e. Handlebars) give us features that make generating
HTML easier. What if Facebook had to create a unique html page for every single user, and had to update it everytime we added a photo or a new status or sent a new chat message to a friend?

Templating languages allows us to dynamically build customized HTML files depending on the request our user sends, the data in our database, and the logic held in our controllers.

### Key Features of Handlebars

Handlebars is considered a server-side rendering language.  This means that we
can use our Express server to inject values into a special Handlebars file.
Handlebars will then write a regular ol' HTML file using our `template` and the `values` we send.  In the future, we will see the other way to build out dynamic views... client-side rendering.

#### Context

The first important feature that Handlebars gives us is context: data that we
can render in our views.

If we define a view for a User's profile, then we want to render the data about
a specific user in that profile. Handlebars lets us do that:

```js
app.get('/profile/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    // Argument 1 is the hbs file located in the views folder
    // Argument 2 is the data we want to send to handlebars
    res.render('users/show', { user })
  })
})
```

Then inside of our template:

```html
<h2>{{ user.name }}</h1>
```

When we pass an object as the second object to `render` it sets the context of
the template. Essentially, it's a way for us to pass data into a template. By
passing in the `user` object we can access all the properties of that object,
like `user.name`.

#### Logic

Handlebars also gives us some tools for control flow within our views, like `if`
and `if/else` statements.

Here's how we define and `if` statement:

```html
{{#if user}}
  <p>The user is signed in!</p>
{{/if}}
```

Here is how we define an `if/else` statement:

```html
{{#if user}}
  <p>The user is signed in!</p>
{{else}}
  <p>The user is NOT signed in!</p>
{{/if}}
```

What we can do with conditionals is rather limited: we can only test if a value
is truthy or falsey. We can't, for instance, check to see if two values are
equal to each other. Any more complicated control flow should probably take
place in our JavaScript somewhere (rather than in our Handlebars template).

#### Looping

We can loop using Handlebars, which makes rendering lists of data really easy.
We can define a block of HTML and loop through an array of objects to render
each item with that block.

```html
<ul>
  {{#each items}}
    <li>{{ title }}</li>
  {{/each}}
</ul>
```

That would give us the following HTML:

```html
<ul>
  <li>Express</li>
  <li>Mongoose</li>
  <li>Handlebars</li>
</ul>
```

## RESTful Views

We're going to define our views as an extension of our routes and controller
actions, which will make knowing what views we need (and naming those views) a
lot easier.

For instance, if we have index, show, new, and create actions in our controller
then we know we'll need index, show and new views:

| URL | Path | Method  | Action | View |
| --- | --- | --- | --- | --- |
| `/resource` | `/` | `GET` | #index | `index.hbs` |
| `/resource/new` | `/new` | `GET` | #new | `new.hbs` |
| `/resource` | `/` | `POST` | #create | |
| `/resource/1` | `/:id` | `GET` | #show | `show.hbs` |
| `/resource/1/edit` | `/:id/edit` | `GET` | #edit | `edit.hbs` |
| `/resource/1` | `/:id` | `PATCH`/`PUT` | #update | | 
| `/resource/1` | `/:id` | `DELETE` | #delete | |

We don't need views for create, update and delete because those routes will
redirect to another action. When we create a new record of our resource, for
instance, we'll save it into the database and then redirect to the show action
for our newly created record.

### Our `views` Directory

Our `views/` directory is going to be pretty simple to set up then! We'll need
to create a new subdirectory for each resource and then each of the four views
that we need from `index.hbs`, `new.hbs`, `show.hbs`, `edit.hbs`:

```sh
views
├── layout.hbs
└── resource
    ├── index.hbs
    ├── new.hbs
    ├── show.hbs
    └── edit.hbs
```

> Note that you wont always need all of these views, just like you don't always
> need all 7 routes and actions.

## Demo: Chirp

We're going to keep working through our [Chirp
app](https://git.generalassemb.ly/atl-wdi/chirp-project),
finishing a lot of important functionality today. At the moment, our routes are
in places, we've defined our Models, filled in our Controllers and started
querying for the data we need. All we need to do now is render our data into
views and we'll be set!

Stage and commit all your work from the previous lesson, if you haven't already!

### Review What We Are Building

When we are designing the front-end of our application, it's important to have wireframes to help guide us towards what we should include in our views.  Check out the wireframe for our mobile first app [here](ADD THE LINK!).

### You Do: Set Up Handlebars (15 min)

In order to start working with Handlebars, we will need to install and set up this new library.  Take a look at the step-by-step instructions [here](./setting-up-handlebars.md) and complete each of them in order to start working with Handlebars.

### Materialize

We're using a CSS framework for our Twitter clone, one called
[Materialize](https://materializecss.com/). Materialize is an implementation of
Google's [Material Design](https://material.io/design/), which is becoming
increasingly popular among web developers. Prior to Materialize, the common
choice for a CSS framework was [Bootstrap](https://getbootstrap.com/).

CSS frameworks give us a stylesheet of predefined CSS classes that we can use to
style our app. Someone else has written all the CSS for us, we just need to use
their classes to style our app.

A framework is a great option for prototypes or small projects where you don't
want to loose momentum. Frameworks are not a good idea for larger projects or
production apps because they can be really big and you're probably only using
a small portion of the code they provide.

Additionally, if you use a framework, your website will look like every other
website that is using that framework!

### You Do: Link Materialize

Find a CDN link for Materialize and add it to your `layout.hbs`.

### Scaffolding out our Views

#### You Do: User Views

What views do we need for our User resource? Create the files and directories
you think we need, we'll fill them in with content later.

<details>
<summary>Hint</summary>

The value of the RESTful routing table, is we can think about what it is we're
trying to achieve and review the table to see what we need. We're trying to
answer the question, "What views do I need?".

The first question is, "What actions are we performing?". You can answer that
question by looking at your controller - what action methods are in there?

Once you know what controller actions you have, look at the table: which of
those get views? Which ones don't?

</details>

<details>
<summary>Solution</summary>

```sh
views
├── app
│   └── index.hbs
├── layout.hbs
└── user
    ├── new.hbs
    └── show.hbs
```

</details>

#### You Do: Chirp Views

What views do we need for our Chirp resource? Create the files and directories
you think we need, we'll fill them in with content later.

<details>
<summary>Hint</summary>

The value of the RESTful routing table, is we can think about what it is we're
trying to achieve and review the table to see what we need. We're trying to
answer the question, "What views do I need?".

The first question is, "What actions are we performing?". You can answer that
question by looking at your controller - what action methods are in there?

Once you know what controller actions you have, look at the table: which of
those get views? Which ones don't?

</details>

<details>
<summary>Solution</summary>

```sh
views
├── app
│   └── index.hbs
├── layout.hbs
├── chirp
│   ├── index.hbs
│   ├── new.hbs
│   └── show.hbs
└── user
    ├── new.hbs
    └── show.hbs
```

</details>

### Start with the Layout

The best place to start when defining your views is with the `layout.hbs` file.
The layout file is going to contain all the HTML that will be on every page: the
`head` tag, the global header and footer, and the navigation.

Our application has a pretty simple layout: just a global header and the body
content, which will come from other views. That means we do need to define that
global header.

### You Do: Make the Header

In your `layout.hbs`, define the header for your application. Your markup should
be semantic!

#### Requirements

- Make a `header` with a class of `site-header`
- Create a `nav` element for our navigation
- Inside the `nav` element, create a `div` with a class of `nav-wrapper`
- Inside your `nav-wrapper` element, you need to create:
  - A link to the homepage (`'/'`) with classes `brand-logo` and `left` and
    content "Chirpy"
  - An unordered list with a class of `right` with two list items, each with a
    link. The first link should go to the page for creating new chirps and have
    the text "+chirp"; the second link should go to the page for creating a new
    user and have the text "New User".

<details>
<summary>One possible solution</summary>

```html
 <header class="site-header">
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo left">Chirp</a>
        <ul class="right">
          <li><a href="/chirp/new">+chirp</a></li>
          <li><a href="/user/new">New User</a></li>
        </ul>
      </div>
    </nav>
  </header>

```

</details>

### The Homepage

Once we have our layout in place, we can get our homepage working! To do so,
lets create a subdirectory inside of `views/`:

```sh
mkdir views/app
touch views/app/index.hbs
```

The homepage is the index action of our application (`app`), so we're going to
call this view `index.hbs`.

Now we need to update the index action of our application controller, in
`controllers/applicationController.js`:

```js
res.render('app/index', { chirps })
```

### You Do: Build out the Homepage

We want to display all our chirps inside of a list. Within each item of the list
(so for an individual chirp) we want to show the content of the chirp that links
to the show page for that chirp, the author of the page with a link to the
author show page, the date the chirp was created and the number of comments.

#### Requirements

- Create a `section` with a class of `chirps` for holding each individual chirp
- Within your `section`, loop through each chirp in the `chirps` array (use the
  Handlebars `#each` loop)
- For each chirp, start with a `div` with a class of `card`
- Your `.card` div will have two child elements:
  - a `div` with a class of `card-content`
  - a `div` with a class of `card-action`
- the `card-content` div should have a link with a class of `card-title` that
  links to the show page for the individual chirp and displays the chirp's
  content.
- the `card-action` div should include the following three elements:
  - a link to the user show page for the chirp's author that contains the
    author's email in the text
  - a `span` with the date the chirp was posted (`createdAt`)
  - a span with the number of comments on the chirp (i.e. `5 Comments`)

<details>
<summary>One possible solution</summary>

```html
{{#if chirps}}
  <ul class="chirps">
    {{#each chirps}}
      <div class="card">
        <div class="card-content">
          <a class="card-title" href="/chirp/{{id}}">
            {{ content }}
          </a>
        </div>
        <div class="card-action">
          <a href="/user/{{ author.id }}" class="">{{ author.local.email }}</a>
          <span class="chirp__date">{{ createdAt }}</span>
          <span class="chirp_comments">{{ comments.length }} Comments</span>
        </div>
      </div>
    {{/each}}
  </ul>
{{/if}}
```

</details>

### Users Resource

We could work with Chirps or with Users next, but we have less work to do for
Users so it makes sense to start there.

#### Creating a New User

In our layout, our header contains a link to create a new user at `/users/new`.
That view should render a form that we can submit to create a new user. To get
that working, lets do the following:

1. Put an `<h1>` inside of the `users/new.hbs` template:

```html
<h1>Create a new user</h1>
```

2. Upate the new action inside the `user` controller to render that view:

```js
// controllers/user.js
module.exports = {
  // ...
  new: (req, res) => {
    res.render("user/new");
  },
  // ...
};
```

Now when we click the link in the header, we should see our `<h1>`.

#### Working with Forms

Working with forms can be a little tricky! When we define the form in our
template, there are 3 things we need to worry about:

1. We need to define the `action` attribute on the `form` element, this is the
   route the form will submit to/
1. We need to define the `method` attribute on the `form` element as `POST` so
   that we send a `POST` request when submittin the form.
1. Every `input` in our form needs to have a `name` attribute.

Let's explain why we need that last one: every `input` in our form needs to have
a `name` attribute.

When we define a form, we submit it to a route inside of our app (that's what
the `action` and `method` attributes control). The input to the form then become
the `body` of that request. When we submit a form, the `body` will be an object
where the `name` attribute on the input fields act as the keys and the values
inside the input fields act as the values.

So this form:

```html
<form action="/user" method="POST" class="auth-form">
  <input type="email" name="email" placeholder="Email">
  <input type="password" name="password" placeholder="Password">
  <input type="submit" value="Sign Up" class="btn">
</form>
```

Will generate this `body` object:

```js
app.post('/user', (req, res) => {
  console.log(req.body)
  /*
   * {
   *    email: 'bugsbunny@gmail.com',
   *    password: 'bugsbunnyrulez!',
   * }
   */
})
```

Our input with a `name` of `email` creates the `email: 'bugsbunny@gmail.com'`
field and our input with a `name` of `password` creates the `password:
'bugsbunnyrules!'` field.

**WARNING**: This is a very BAD way to store passwords.  Keeping passwords in plain text on a database is a massive security flaw.  We will learn how to encrypt these passwords later in the course.

#### Body Parser (Now Built Into Express!)

By default, Express does not parse the body of a request - it ignores it
completely. When we're working with forms, that's not what we want! In order to
have the body of a request included in the request object (`req`), we need to
use a special piece of middleware called `body-parser`.  For years, this was a separate library that we would have to download through `npm`, but now it's methods are built into `express`!

To setup body parser, we just have to tell Express to use body parser:

```js
// Make sure this is above wherever you have written routes.
// For forms, we want to use the urlencoded feature of body parser:
app.use(express.urlencoded({ extended: true }));

// Later, when we're working with JSON, we'll want to use the JSON
// feature of body parser:
app.use(express.json());
```

Now that body parser is setup and installed in our app, we're ready to create a new user form!

### You Do: New User

Fill in the `user/new.hbs` template with a form for creating new users!

#### Requirements

- Your form should send a `POST` request to the create action of your user controller
- You should have fields for the user's email and password
- Each input should be wrapped in a `<p>` tag with a class of `input-field`
- Your form should have a submit button with a class of `btn`

<details>
<summary>One possible solution</summary>

```html
<section class="row">
  <h4>Create User:</h4>

  <form action="/user" method="POST" class="auth-form">
    <p class="input-field">
      <input type="email" name="email" placeholder="Email">
    </p>
    <p class="input-field">
      <input type="password" name="password" placeholder="Password">
    </p>
    <p class="input-field">
      <input type="submit" value="Sign Up" class="btn">
    </p>
  </form>
</section>
```

</details>

### Creating Users

Per REST, our `new` action renders a form for creating instances of a resource and that form sends a `POST` request to our `create` action. Right now our `new` action is working: it renders a form. We've also defined that form and it sends a `POST` request to our `create` action. Inside of our `create` action, we need to take the form data from inside the request body (`req.body`) and use it to create a User in our database. Then, when we've successfully created a new user, we want to display the `show` action for that user (i.e. `/user/:id` where `:id` is the ID for the new user):

```js
// controllers/user.js
module.exports = {
  // ...
  create: (req, res) => {
    // Create a new user from the request body:
    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(user => {
      // Now that we've created the user, let's display it
      // by rendering the user show action for our new user:
      res.redirect(`/user/${user._id}`);
    });
  }
};
```

### You Do: New Chirp View

Creating a new chirp will be very similar to creating a new User. You want to render a form with fields for the content of your chirp and the user who the chirp belongs to.

<details>
<summary>One possible solution</summary>

```html
<section class="form-container">
  <h4>New Chirp</h4>
  <form action="/chirp" method="post" class="chirp-form">
    <div class="input-field">
      <textarea name="content" cols="30" rows="10" placeholder="Message"></textarea>
    </div>
    <div class='input-field'>
      <select name="author" id="author">
        <option value="" disabled default selected>Choose the User</option>
        {{#each users}}
          <option value="{{_id}}">{{email}}</option>
        {{/each}}
      </select>
    </div>
    <div class="input-field">
      <input type="submit" value="Chirp" class="btn">
    </div>
  </form>
</section>
```

> Note: In order for the select to work, we will need to add this snippet of JavaScript. (Materialize Requirement)
```html
 
 <script>
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

  </script>
```

</details>

### You Do: Chirp Show View

Once your `new` and `create` actions are working and creating chirps, we need to create the `show` view for our new chirps!

<details>
<summary>One possible solution</summary>

```html
<p class="card">
  <div class="card">
    <div class="card-content">
      <a class="card-title" href="/chirp/{{chirp._id}}">
        {{ chirp.content }}
      </a>
    </div>
    <div class="card-action">
      <a href="/user/{{ chirp.author._id }}" class="">{{ chirp.author.email }}</a>
      <span class="tweet__date">{{ chirp.createdAt }}</span>
      <span class="tweet_comments">{{ chirp.comments.length }} Comments</span>
    </div>
  </div>
</p>
```

</details>

### Using `PUT` and `DELETE`

When we introduced the HTTP methods, one of the side notes was that browsers have only implemented `GET` and `POST`. If you think about REST and our resource table, that means we don't have any way of updating or deleting items!

We don't have any native, browser implementation way of doing so. In a future lesson we'll talk about AJAX, which is a tool for making HTTP requests with JavaScript. For now, we're going to learn about some Express middleware called [Method Override](https://github.com/expressjs/method-override).

Method override lets us *override* the HTTP *method* of a request. We do so by adding a query parameter to the URL. So if we have a form that we want to make a `PUT` request with, we would add `?_method=PUT` to the end of the action:

```html
<form action="/user?_method=PUT" method="POST" class="auth-form">
  <input type="email" name="email" placeholder="Email">
  <input type="password" name="password" placeholder="Password">
  <input type="submit" value="Sign Up" class="btn">
</form>
```

### We Do: Add Comments to Chirps by Updating them

We're going to update our Chirp show view to include a form for updating chirps. This form will send a `PUT` request to our chirp edit action and add a comment to our chirps. Once we do that, we can display the comments on a chirp inside the chirp show view!

## Closing

We now have an almost finished version of our Twitter clone! The last piece is to add Authentication, which we'll do in a future lesson.

## Additional Resources

* [Express Documentation on using Templating Engines](https://expressjs.com/en/guide/using-template-engines.html)
* [Handlebars Documentation](http://handlebarsjs.com/)
* [Body Parser](https://github.com/expressjs/body-parser)
* [Method Override](https://github.com/expressjs/method-override)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
