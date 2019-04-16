# How To Submit Assignments

## Install lessonClone

`lessonClone` is a script that downloads the given lesson from the
`sei-curriculum` repository

__This is to only be done once for the entire course__

copy and paste the below commands in your terminal and press enter:

```
mkdir sei-21
cd sei-21
curl "https://raw.git.generalassemb.ly/gist/nharvey/09ffe7ebb9939c5eeded3ece2ddbbb62/raw/26d0192789e6782427f7a86e0919d161ebc07050/lessonClone" > lessonClone
chmod +x ./lessonClone
basename $(pwd)
```

If this prints out `sei-21` then you're done with this step.

## Create A New Repo For Your Homework

1.  Create a new github repo on github enterprise

    * in the next step __DO NOT INITIALIZE WITH A README DURING STEP 4__
    * in the next step __MAKE YOUR REPOSITORY PUBLIC__
    * in the next step skip steps 5 and 6
    * go to https://help.github.com/en/articles/creating-a-new-repository
1. Download the lesson's repo

  * `cd sei-21`
  * `./lessonClone <lesson-name>`
  * `cd <lesson-name>`
  * `git init`
  * `git remote add origin <url-of-new-repo>`
  * create a new commit with all your work
  * `git push origin master`
1. Work on your assignment

    * Create commits as you go
    * push to your new repo
1. Submit a link to your repo

[lessonClone]: ./src/lessonClone
