const { exec } = require("child_process");
const { readLessonsFile, jsonFriendlyLesson } = require('./lesson.js');
const { makeAllLessons, lessonsToMarkDownTable } = require('./scheduler.js');

const cloneLesson = (lesson) => {
  return new Promise((resolve, reject) => {
    exec(`echo 'git clone ${lesson.url} bin/${lesson.name}'`, (err, stdout, stderr) => {
      
      console.error(stderr);

      if(err) {
        console.error("Saving to new dir");

        exec(`mkdir -p bin/${lesson.name}`);
        exec(`echo \"# ${lesson.name}\n\n${lesson.url}\" >> bin/${lesson.name}/readme.md`);
      }

      lesson.url = `./${lesson.name}`;

      resolve(lesson);
    });
  });
};

exec('mkdir -p bin');

readLessonsFile(process.argv[2])
  .then(lessons => Promise.all(
    lessons.filter(l => l.sequence.unit == 1 || l.sequence.unit == 2).map(cloneLesson)
    //lessons.map(cloneLesson)
  )).then(newLessons => {
    console.log(
      lessonsToMarkDownTable(
        makeAllLessons(newLessons).map(jsonFriendlyLesson)
      )
    );
  });
