[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Intro to Python

Let's start learning our second programming language!

## Prerequisites

* Fundamentals of programming in one other programming language

## Objectives

By the end of this, developers should be able to:

* Describe the history, background, and use-cases for Python
* Compare and contrast Python with a previous language
* Write basic programs in Python

## What is Python?

Python is a high-level, general purpose programming language created by Guido
van Rossum in 1991. It is the
[fourth](https://stackify.com/popular-programming-languages-2018/)
most used programming language behind Java, C, C++, and C#. Python can be used
for data science, devops, or general purpose programming. In this class, we will
be using it as a server-side "back-end" programming language.

## The Zen of Python

Tim Peters, one of the original Python users wrote the following poem on the philosophy behind the Python language.

```
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

### Getting Python via pyenv


MacOS comes with its own version of Python The OS uses Python to run various processes. So while it’s not terrible to mess with the configuration of your systems Python, it’s better just have our own version that we can change and update without worrying about the side effects.

To see where the current Python is being executed, run: `$ which python`. This should output to /usr/bin/python.

If we run `$ python -v`, it'll output the standard one at the current time. Not every app uses this version, so we need to use our own tool to manage Python versions.

Before we begin, let's ensure Python is installed on your computer:

### Installing pyenv
```
# pyenv enables us to download specific versions of python
brew install pyenv

# list all the available Python versions
pyenv install -l

# Find the latest one that looks like:
# 3.7.0
# that DOES NOT have a -dev or -rc.
# At the current time, the latest one is 3.7.0
pyenv install 3.7.0
# This takes awhile!
```

### Get the Correct Version of Python Running
Now we'll check to see if we're using the correct version of Python.

Previously, when we ran `$ which python`, we got `/usr/bin/python`. Let's fix that.

```
$ echo -e '\nif command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile

$ source ~/.bash_profile
```

Now try and and find the version using `python --version`. If you see 3.7.0 or greater then you were successful!


### Interacting with Python

There are a few ways that we can interact with Python

#### By File

The first way that we can interact with Python is by running a Python file.
Python files have the extension `.py` and can be run through the command line:

```
$ touch app.py  # Create a Python file
$ python app.py   # Run that Python file
```

#### By REPL (Read-Eval-Print-Loop)

The second way that we can interact with Python code is with a tools like
IPython or the Python shell. These are both REPLs. Have we used these before?

1.  Install: `$ pip install ipython`
2.  Run REPL: `$ ipython`
3.  Quit from REPL: `exit`
4.  Alternative: `$ python`

> IPython is an alternative Python shell that adds a bunch of features like tab
> completion, better syntax highlighting, and the ability to inline embed
> graphics.

We'll use iPython for the first portion of this lesson.

## Fundamental Data Types

### Variables

Variables in Python are assigned by using a single equals sign (`=`):

```python
my_favorite_animal = "flying squirrel"
# => "flying squirrel"
```

Notice a few other things about the above block of code:

* We no longer need to precede new variables with `var`, `let`, or `const`. Just use the name of the variable!
* Variables are instantiated as they are used
* Variables are also written in `snake_case`. That means all lower case with words separated by underscores.
* Variable names should still be semantic

### No Semicolons

While your code will work if you close a line with `;`, common practice is not to use them.

## You Do: Data Types

* Open a terminal and start the IPython REPL
* Spend 15 minutes going through everything up until the **In Class Checkpoint** section below this one. Testing out the each command in the iPython REPL.

<details>
<summary>Why do we have to read all this ourselves?</summary>

This is part of the gradual release of responsibility that we have discussed and
that you have experienced during your projects, this is the part where you become
developers and you don't rely on others to teach you. Developers have to teach
themselves all the time, right now you are doing that in an environment where
you have support.

While we could re-teach you what numbers, strings, conditionals, etc. are like
in Python, you know enough about programming languages from your experience with
JavaScript to pick up on this information yourself pretty quickly.

Because of this, the peculiarities of Python will be apparent. These are the things you need to be aware of in the next few classes.

I will come by and check your understanding one-on-one and ask you questions

</details>

### Everything Is An Object!

Everything in Python is an **object**.

* By "object" we mean that everything has its own set of properties and methods
* Not a new concept. Some data types in JavaScript had their own properties and methods (e.g., `string.length`)
* You will learn more about this when you dive into Python OOP next week

### Numbers

Python uses similar arithmetic operators to JavaScript

* `+`, `-`, `*`, `/`, `%`
* Same order of operations too: P.E.M.D.A.S.

```py
1 + 2 # Addition
# => 3

6 - 5 # Subtraction
# => 1

5 * 2 # Multiplication
# => 10

30 / 5 # Division
# => 6.2

31 // 5 # Note: integer division
# => 6

30 % 5 # Modulo (remainder)
# => 0

31 % 5
# => 1

3 ** 2 # Exponentiation
# => 9
```

> Are any of these different in JavaScript?

### Strings

Words, just like in JavaScript.

* Surrounded by single or double-quotes
* Python uses similar escape characters
  * [Here is a list of them](http://python-reference.readthedocs.io/en/latest/docs/str/escapes.html)

```py
name = "John"
# => "John"

full_name = "John\nDoe"
# => "John\nDoe"

print(full_name)
# John
# Doe
```

Not only can you concatenate strings, now you can multiply them too! Remember we
couldn't do that in JavaScript?

```py
# Concatenation
"Hello " + "there!"
# => "Hello there!"

# Multiplication
"Hello there! " * 3
# => "Hello there! Hello there! Hello there! "
```

#### String Interpolation

Sometimes you will want to print out a string that incorporates a variable. For
example:

```py
my_name = "Ali"
# => "Ali"

print("Hi my name is: " + my_name)
# Hi my name is: Ali
```

This works fine. Things aren't so simple when that variable is of a different
data type. Like a number:

```py
class_number = 20
# => 20

print("I am teaching WDI " + class_number)
# TypeError: must be str, not int
```

This is something JavaScript would just handle for you, but Python is more
strict. In this case, you either need to convert the variable to a string using
`str()` or use the `.format()` method. The best way of doing string
interpolation in Python is using `.format()`.

`.format()` is a string method that takes the strings to be concatenated as its
parameters. If the string contains `{}`s, the parameters fill the `{}`s in the
order passed in. If they contain a number (beginning with 0), they will be
mapped to the parameter passed to `.format()` at said index.

> Is there a similar way to format strings in JavaScript?

```python
class_number = 22

"I am teaching WDI {}.".format(class_number)
# => "I am teaching WDI 22."

person1 = "Lauren"
person2 = "Frank"
occupation = "consultant"

"{0} is a {1}. {2} is a {1} as well.".format(person1, occupation, person2)
# => "Lauren is a consultant. Frank is a consultant as well."
```

F strings are also a brand new way of doing string interpolation in Python -- you won't see them in many places, but they are super helpful.

```py
class_number = 22
print(f"I am teaching WDI {class_number}.")
```

> Note the `f` at the beginning of the string!

### Booleans

They are `True` and `False` (note the capitals!)

* We'll be using them in conditionals and comparisons just like in JavaScript

Comparison operators in Python are nearly identical to JavaScript. However, the
check for equality is always for both value and data type.

* `<`
* `>`
* `<=`
* `>=`
* `==`
* `!=`

> In JavaScript, what is the difference between `==` and `===` ?

Logical operators are also similar.

- and, or, not

|                      |              JavaScript              |           Python            |
| :------------------- | :----------------------------------: | :-------------------------: |
| logical operators    | `&&`, <code>&#124;&#124;</code>, `!` |     `and`, `or`, `not`      |
| relational operators |  `==` `!=` `>` `<` `>=` `<=` `===`   | `==` `!=` `>` `<` `>=` `<=` |

### None

Python's "nothing".

* The equivalent of JavaScript's `null`
* it is falsey

### Conditionals

Pretty similar to JavaScript, with some differences:

* No parentheses or curly brackets required
* Begin blocks using `if`, `elif` and `else`
* Indentation matters! 4 spaces is the standard indent.

Here's an example where we check for height at a roller coaster:

```py
print("Welcome to the Iron Rattler! How tall are you (in feet)?")
height = int(input())

if height < 4:
    print("Sorry, you'll fly out of your seat if we let you on.")
elif height < 7:
    print("All aboard!")
else:
    print("If you value your head, you should not get on this ride.")
```

## We Do: Python Bouncer

Back during our first few lessons on JavaScript, you used conditionals and
variables to create a Bouncer. You can make a python file for this in your
sandbox. Walk me through how to do the same, but now with Python!

Here's the recap of the bouncer rules:

> If the age variable is below 21, the program should output that the person
> cannot enter because they are too young, if they are over 21 they can enter,
> and if age is not a number it outputs an error.
>
> Bonus: if age is 18 or older, but under 21, output that the person can enter
> the bar but cannot drink!

## You Do: Data Types Exercises (20 min / 1:00)

Complete the first set of exercises (Exercise I: Data Types) in [this
repo](https://git.generalassemb.ly/sf-wdi-48/python-basics-exercises).

## Break

## Print and Input (`input` & `output`)

To print out to the console like `console.log()` does in JavaScript, we use the
`print` function:

```python
print("Hello, World!")
# Hello, World!
```

Python also makes it easy for us to accept user input from the command line
using `input`:

```python
user_input = input()
# => "My input" (Note that this line was typed by the user in the terminal)

user_input
# => "My input"
```

## Lists & Collections(15 min / 1:30)

An ordered collection of related values. Same syntax as JavaScript arrays. The
data type is called a <b>list</b>

* Square brackets
* Values separated by commas
* Zero-indexed

```python
numbers = [1, 2, 3]
# => [1, 2, 3]

animals = ["dog", "cat", "horse"]
# => ["dog", "cat", "horse"]

animals[0]
# => "dog"

animals[1] = "elephant"
# => "elephant"

animals
# => ["dog", "elephant", "horse"]
```

### List Methods

Python is very nice. It provides us with an extensive library of list methods we
can use to traverse and manipulate arrays.

* The Python [documentation](https://docs.python.org/3/tutorial/datastructures.html) for `List` is a great resource for learning more about these methods
* Can't go over them all, but chances are if you could do it in JavaScript then you can do it in Python.

> **IMPORTANT:** You DO NOT need to memorize these. The following is just
> a sample of array methods available to you. You'll come to be more familiar
> with these as you need them and look them up in documentation.
>
> **tl;dr:** The more you Google them, the better you'll remember them.

#### Append/Extend/Pop

* Append inserts an item into the end of the list.
* Extend adds two arrays together.
* Pop removes an item from the end of the list. You can also supply an index to `pop` to remove at that index.

```py
numbers = [1, 2, 3, 4, 5]
# => [1, 2, 3, 4, 5]

numbers.append(6)
# => [1, 2, 3, 4, 5, 6]

numbers.append([1, 2, 3])
# => [1, 2, 3, 4, 5, 6, [1, 2, 3]]

numbers.extend([7, 8, 9])
# => [1, 2, 3, 4, 5, 6, [1, 2, 3], 7, 8, 9]

numbers.pop()
# => 9

numbers
# => [1, 2, 3, 4, 5, 6, [1, 2, 3], 7, 8]

numbers.pop(0)
# => [2, 3, 4, 5, 6, [1, 2, 3], 7, 8]
```

#### Sorted

Organizes list values from lowest to highest. Numbers and strings.

```py
numbers = [3, 1, 5, 2, 4]
# => [3, 1, 5, 2, 4]

sorted(numbers)
# => [1, 2, 3, 4, 5]
```

#### Remove

* Removes an argument from an array
* If there are multiple instances of that argument, it will delete just the first.

```py
numbers = [3, 1, 2, 2, 4]
# => [3, 1, 2, 2, 4]

numbers.remove(2)
# => 2

numbers
# => [3, 1, 2, 4]
```

## Dictionary

A Python dictionary is an unordered collection organized by key-value pairs. A dictionary is very similar to a JavaScript object.

```py
wdi_class = {
  "teacher": "John",
  "students": ["Yacko", "Wacko", "Dot"],
  "classroom": 2,
  "in_session": True,
  "schedule": {
    "morning": "Python Basics",
    "afternoon": "Enumerables"
  }
}
```

Accessing dictionary values:

```py
wdi_class["teacher"]
# => "John"
```

Modifying dictionary values:

```py
wdi_class["teacher"] = "Jack"
# => "Jack"
```

### Dictionary Methods

Like lists, Python also provides us with a library of dictionary methods.

* [Again, the Python documentation is a great resource](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)

> As mentioned with lists, do not worry about memorizing these methods. Just know how to look them up should the need arise.

#### Keys

Returns a `dict_keys` structure with all the keys in the dictionary. Can easily be translated to a list using `list()`.

```py
wdi_class.keys()
# => dict_keys(['teacher', 'students', 'classroom', 'in_session', 'schedule'])
```

## Ranges

Use ranges to quickly generate lists of numbers.

* Parentheses
* Min and max value - 1 inside `range`
* Generate list using `list()` function

```py
list(range(1, 6))
# => [1, 2, 3, 4, 5]
```

## You Do: Data Collections Exercises

> 15 minutes exercise. 5 minutes review.

Complete the second set of exercises (Exercise II: Data Collections) in [this repo](https://git.generalassemb.ly/sf-wdi-48/python-basics-exercises).

## Functions

In Python, functions are defined like this:

```rb
def double(number):
    return number * 2
```

* `def` - the Python equivalent of `function`
* `double` - the function name in the above example
* `number` - the parameter name in the above example

We invoke it like this:

```
double(3)
# => 6
```

You may have noticed that we use the same `return` notation as JavaScript.

Python functions can also establish default argument values. In the below example, if we do not provide our `double` function with an argument, it will default to 5

```py
def double(number=5):
    return number * 2

double()
# => 10
```

## You do: Exercise: Temperature Converter

> 15 minutes exercise. 10 minutes review.

[Temperature Converter (Python)](https://git.generalassemb.ly/SF-WDI/temperature-converter-python)

## Compare and Contrast, Part 2

<img src="https://media.giphy.com/media/l4FGw4d101Sa0pGTe/giphy.gif" margin-left="24%"/>

Break out in to groups of 3, then, with your group, compare and contrast again
what you know about JavaScript with what you now know about Python on the
whiteboard. You can do this with a table, a mind map or however you think is
best.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
