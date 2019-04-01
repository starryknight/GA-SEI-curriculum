const { exec } = require("child_process");
const { readLessonsFile } = require('./lesson.js');

const cloneLesson = (lesson) => {
  exec(`git clone ${lesson.url} bin/${lesson.name}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  });
};

exec('mkdir -p bin');

readLessonsFile(process.argv[2])
  .then(lessons => {
    lessons.filter(l => l.sequence.unit == 1).forEach(cloneLesson);
  });
