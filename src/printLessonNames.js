const { makeAllLessons }  = require('./scheduler.js');
const { readLessonsFile }  = require('./lesson.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readLessonsFile(scheduleJSONFilePath)
    .then(lessons => 
      makeAllLessons(lessons).forEach(l =>
        console.log(`${l.sequence.toString()} ${l.name} ${l.url}`)
      )
    );
