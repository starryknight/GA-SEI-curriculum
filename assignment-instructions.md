# How To Submit Assignments

## Install LessonClone

__This is to only be done once for the entire course__

```
mkdir sei-21
cd sei-21
curl "https://raw.git.generalassemb.ly/gist/nharvey/09ffe7ebb9939c5eeded3ece2ddbbb62/raw/26d0192789e6782427f7a86e0919d161ebc07050/lessonClone" > lessonClone
chmod +x ./lessonClone
```

## Create A New Repo For Your Homework


1. Download the lesson's repo (this is not a git clone)

        * `cd sei-21`
        * `./lessonClone <lesson-name>`
        * `cd <lesson-name>`
        * `git init
1.  Create a new github repo

    * __DO NOT INITIALIZE WITH A README DURING STEP 4__
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