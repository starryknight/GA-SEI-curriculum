# Scheduler Documentation

The scheduler source code aims at solving the following problems:

* Defining the order in which lessons should be taught without regards to
  standard time keeping methods (calendars, clocks, etc.). This helps keep
  lessons relative to each other rather than tied down to calendars (which are
  less consistent between courses)
* Enforcing business rules and lesson dependencies. Often certain details
  lesson planning gets overlooked (dependencies, time-dependent events,
  unplanned shifting of dates for the course). We need a way to formalize these
  details and have an automated way of testing and generating the schedule.

# Lesson

A lesson is the content to be taught within a single time period. 

## Naming Conventions

Lessons are to have the following format:

    <lang/platform>-<subname>-<lesson-type>
for example:

    js-domIntro-lesson

`lesson-type` should be on of the following:

* lesson (either a lecture period or a self-teach)
* exercise (a task the student should complete and _will be graded_)
* practice (a task the student should complete and _will not be graded_)

Non-example of lesson names:

  * atm-lab
  * donut-shop-exercise
  * objects-in-spaaaaaaceeeeeee
These are not transparent in what the lesson teaches and avoids thinking of
lessons at a higher level (what a lesson accomplishes rather than what its
actually having the students do)

# Sequences 

A sequence refers to the concept of ordering surrounding a lesson. Currently a
sequence is simply a pairing of a given lesson, and a time (see note in
`./src/timeSequence.js`)

## Sequences In Schedule.md

The sequences displayed in the `schedule.md` file are derived from the time
of a sequence. Currently the displayed format is as follows:

    unit.day.block
Where block is an integeger refering to the different parts of a day.

__DO NOT USE SEQUENCES IN ISSUES OR PR TITLES__ Sequences names that are
displayed on the `schedule.md` file are subject to change (at least between
cohorts).

# Time

Time (for our purposes) refers to a single point on a positive integer number
line. The literal time (hours minutes and seconds) a lesson occurs should be
derived from the given "time" of a lesson.
 

# Schedule.json

This is the main source of truth for how lessons are laid out. The schedule.json 
should contain all the data necessary to be consumed and generate any view of
the course schedule, the dependencies between lessons, and any business logic that
needs to be applied (such as recurring lessons, sequence conflicts etc.).
