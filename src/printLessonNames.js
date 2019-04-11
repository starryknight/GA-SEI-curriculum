const { readScheduleJSONFile } = require('./scheduleFile.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readScheduleJSONFile(scheduleJSONFilePath)
