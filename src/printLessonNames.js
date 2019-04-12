const SchedulerFileApi = require('./scheduleFile.js');
const Sequence = require('./sequence.js');

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath) {
  SchedulerFileApi(scheduleJSONFilePath).then(scheduleFileApi => {
    scheduleFileApi.allSequences.forEach(
      Sequence.printSequence(scheduleFileApi.timeApi.timeToString)
    ) 
  });
}
else
  console.error("schedule json file required!")
