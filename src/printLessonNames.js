const { readScheduleJSONFile } = require('./scheduleFile.js');
const Sequence = require('./sequence.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readScheduleJSONFile(scheduleJSONFilePath)
    .then(sequences => {
      Sequence.printSequences(sequences);
    });
else
  console.error("schedule json file required!")
