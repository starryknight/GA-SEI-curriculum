const { makeAllLessons, printLessons }  = require('./scheduler.js');
const { readLessonsFile }  = require('./lesson.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readLessonsFile(scheduleJSONFilePath)
  .then(lessons => 
    printLessons(makeAllLessons(lessons))
  );
