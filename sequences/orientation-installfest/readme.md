# Installfest

## Lesson Objectives

1. Signup for the following services

    - Slack
    - Google Classroom
    - Github
    - Github Enterprise

1. Install the following programs:

    - Git
    - homebrew
    - iTerm2
    - NodeJs
    - Visual Studio Code
    - Spectacle
    - MongoDB
    - Postgresql

__IMPORTANT: THIS IS AN EXERCISE IN FOLLOWING INSTRUCTIONS__. This guide is _NOT_ a
lesson. Please do not try and understand everything that you are doing. Most of
the software that we are installing will be discussed to greater detail later
in the course. 

__IF YOU RUN INTO AN ISSUE__:

1. First, verify that you've typed the given commands __letter for letter__
1. Then, check the board if any changes were made during the installfest
1. Finally, ask an instructor for help.

# How To Open The Terminal <a name="open-terminal"></a>

Open Terminal: 

1. press &#8984; + &#9251; (command + space)
1. type "terminal"
1. press `Enter`

# Signup For Services

## Slack

Verify that you have access to the class' slack channel. Please see an
instructor if you don't.

Post a `hello world` message once you get access.

## Google Classroom

1. Go to https://classroom.google.com
1. Sign into your Google account _NOTE:_ If you don't have one please register
   for a new Google Account.
1. Join the class room using this classroom code
    ```
    d8cnllj
    ```

## Github

1. Go to https://github.com
1. Signup if you don't already have an account
1. Slack your instructors your GH (GitHub) user name

## Github Enterprise

1. Go to https://git.generalassemb.ly (known as GitHub enterprise or GHE)
1. Register for a new account if you don't already have one. (_Note_: this is a
   different GitHub than the one at https://github.com).
1. Slack your instructors your GHE username.

# Install Software

## Homebrew

1. Run the below command in your terminal

    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
1. Run

    ```bash
    brew update
    brew upgrade
    ```
1. Verify the install worked by running
    ```bash
    brew --version
    ```

## iTerm2

1. Run the command in your terminal

    ```bash
    brew cask install iterm2
    ```
1. Close your Terminal program
1. Open iTerm2 (see the [section above](#open-terminal); use "iterm2" instead
   of "terminal")

## NodeJs

1. Run the following command:

    ```bash
    brew install node
    ```
1. Verify the install worked:

    ```bash
    node
    ```
1. To exit the nodejs shell type `.exit`

## VS-Code

1. Run the following command 

    ```bash
    brew cask install visual-studio-code
    ```

1. To verify you've installed VSCode  run 

      ```bash 
      code .
      ```
   in the terminal to edit the files in the current directory using VSCode.

## Spectacle

1. Run the following command: 

    ```bash
    brew cask install spectacle
    ```
1. Open Spectacle from Spotlight (`cmd + space`)
1. Update system preferences for Spectacle:
1. Click the padlock in the bottom left corner so you can make changes and then
   check the box next to Spectacle to allow the app to control your computer.
1. (optional): Read the [Spectacle docs][spectacle] on how to use spectacle.
  
## Git

1. Run the following command:

    ```bash
    brew install git
    ```
1. Verify you've installed git by running: 

    ```bash
    git --version
    ```

## MongoDB

1. Run the following commands:

    ```bash
    brew install mongodb
    sudo mkdir -p /data/db
    sudo chown $(whoami) /data/db
    ```
1. To load and start the MongoDB background service, run the following commands:

    ```bash
    brew tap homebrew/services
    brew services start mongodb
    mongo
    ```
1. press `ctrl+c` to quit the shell.

## PostgreSQL 

1. Run the following commands

    ```bash
    brew install postgres
    brew services start postgres
    createdb
    ```
1. Verify you've installed postgresql:

    ```bash
    psql
    ```
1. Exit `psql` by typing `\q` and pressing `Enter`

# Extra

* [Homebrew docs][homebrew]
* [Iterm2 docs][iterm]
* [Spectacle docs][spectacle]

[homebrew]: https://brew.sh/
[iterm]: https://iterm2.com/index.html
[brew-cask]: https://caskroom.github.io/
[spectacle]: https://github.com/eczarny/spectacle#keyboard-shortcuts
