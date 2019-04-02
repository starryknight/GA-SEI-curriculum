const { exec } = require("child_process");
const { readLessonsFile } = require('./lesson.js');

const cloneLesson = (lesson) => {
  return new Promise((resolve, reject) => {
    exec(`git clone ${lesson.url} bin/${lesson.name}`, (err, stdout, stderr) => {
      if(err) {
        exec(`mkdir bin/${lesson.name}`);
        exec(`echo \'#${lesson.name}\n\n${lesson.url}' >> ${lesson.name}/readme.md`);
      }

      lesson.url = `./${lesson.name}`;

      resolve(lesson);
    });
  });
};

exec('mkdir -p bin');

readLessonsFile(process.argv[2])
  .then(lessons => {
    lessons.filter(l => l.sequence.unit == 1).forEach(cloneLesson);
  });
