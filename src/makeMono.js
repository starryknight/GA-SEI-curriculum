const { exec } = require("child_process");
const { readLessonsFile, jsonFriendlyLesson } = require('./lesson.js');
const { makeAllLessons } = require('./scheduler.js');

const isGitLesson = (lesson) => 
  lesson.url.indexOf("git") !== -1
  && lesson.url.indexOf("/master") === -1;

const printGitClone = (lesson) => `git ${lesson.name} ${lesson.url}`;

const printNonGit = (lesson) => `dir ${lesson.name} ${lesson.url}`;

const printLessonAction = (lesson) => isGitLesson(lesson) 
  ? printGitClone(lesson) 
  : printNonGit(lesson);

readLessonsFile(process.argv[2])
  .then(lessons => {

    //print actions for bash script only for units 1 and 2
    lessons
      .filter(l => l.url.trim() !== "" && (l.sequence.unit == 1 || l.sequence.unit == 2))
      .forEach(l => console.error(printLessonAction(l)));

    //print new schedule.json
    console.log(
      JSON.stringify(
       lessons.map(jsonFriendlyLesson),
       null, 
       4
      )
    );
  });
