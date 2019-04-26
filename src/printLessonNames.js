/* Consumes given schedule JSON file and generates list of sequences to stdout
 * in the following format:
 *
 * <sequence-number> [<lesson-name>]
 *
 * This is intended to be consumed by a program that converts this to a markdown table
 *
 */

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
