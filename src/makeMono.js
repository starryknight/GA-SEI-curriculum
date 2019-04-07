const { exec } = require("child_process");
const { readLessonsFile, jsonFriendlyLesson } = require('./lesson.js');
const { makeAllLessons } = require('./scheduler.js');

const makeLessonURLLocal = (lesson) => {
  lesson.url = `./${lesson.name}`;

  return lesson;
};

const isGitLesson = (lesson) => 
  lesson.url.indexOf("git") !== -1
  && lesson.url.indexOf("/master") === -1;

const printGitClone = (lesson) => `git ${lesson.name} ${lesson.url}`;

const printNonGit = (lesson) => `dir ${lesson.name} ${lesson.url}`;

const printLessonAction = (lesson) => isGitLesson(lesson) 
  ? printGitClone(lesson) 
  : printNonGit(lesson);

readLessonsFile(process.argv[2])
  .then(ll => {
    let lessons = ll.filter(l => l.sequence.unit == 1 || l.sequence.unit == 2)

    //print actions for bash script
    lessons.forEach(l => console.error(printLessonAction(l)));

    //print new schedule.json
    console.log(
      JSON.stringify(
       makeAllLessons(lessons.map(makeLessonURLLocal)).map(jsonFriendlyLesson),
       null, 
       4
      )
    );
  });
