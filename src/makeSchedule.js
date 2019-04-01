const { lessonsToMarkDownTable, makeAllLessons }  = require('./scheduler.js');
const { readLessonsFile }  = require('./lessons.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readLessonsFile(scheduleJSONFilePath)
    .then(lessons => 
      console.log(
        lessonsToMarkDownTable(
          makeAllLessons(lessons)
        )
      )
    );
