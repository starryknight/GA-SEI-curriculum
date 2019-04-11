const { readScheduleJSONFile } = require('./scheduleFile.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readScheduleJSONFile(scheduleJSONFilePath)
    .then(sequences => {
      console.log(sequences.map(s => s.toString()))
    });
else
  console.error("schedule json file required!")
