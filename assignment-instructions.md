# How To Submit Assignments

## Install LessonClone

```
mkdir sei-21-hw
cd sei-21-hw
curl https://raw.git.generalassemb.ly/atl-wdi/sei-curriculum/src/lessonClone > lessonClone
chmod +x ./lessonClone
```

## Create A New Repo For Your Homework

1. See instructions for assignment.

    * download the lesson [lessonClone][lessonClone] script:

        * `cd sei-21-hw`
        * `./lessonClone <lesson-name>`
        * `cd <lesson-name>`
1.  Create a new github repo

    * __DO NOT INITIALIZE WITH A README__
    * https://help.github.com/en/articles/creating-a-new-repository
1. Push to your new repo
    
    * `git remote add origin <url-of-new-repo>`
    * create a new commit with all your work
    * `git push origin master`
1. Work on your assignment

    * Create commits as you go
    * push to your new repo
1. Submit a link to your repo

[lessonClone]: ./src/lessonClone
