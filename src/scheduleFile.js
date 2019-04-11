//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');
const Sequence = require('./sequence.js');
const Lesson = require('./lesson.js');
const SequenceTimeApi = require('./timeSequence.js');
const SchedulerApi = require('./scheduler.js');

function SequenceFormatException(str) {
  Error.call(this, str + 'sequence should match /^(\d+).(\d+).(\d+)$/');
}

const makeSequenceFromString = (lesson = new Lesson.Lesson(), str) => {
  let pattern = /^(\d+).(\d+).(\d+)(.(\d+))?$/;

  let result = pattern.exec(str);

  if(result)
  {
    return new Sequence.Sequence(lesson, Number.parseInt(result[1], 10),
      Number.parseInt(result[2], 10),
      Number.parseInt(result[3], 10),
      result[5] ? Number.parseInt(result[5], 10) : 1
    );
  }
  else
  {
    throw new SequenceFormatException(str); 
  }
}

/*
 * Parses raw JSON data that has the following schema:
 *
 * {  nBlocks: Number, 
 *    unitEndDays: [Number], 
 *    recurring: { name: String, block: Number}
 *    lessons: [{name: String, 
 *      sequence: String, 
 *      duration: Number, 
 *      depends: [String]
 *    }]
 * }
 */
const parseScheduleFromJSON = (rawJSON) => {
  let scheduleData = JSON.parse(rawJSON);

  let seqTimeApi = new SequenceTimeApi(scheduleData.nBlocks, scheduleData.unitEndDays);
  let schedulerApi = new SchedulerApi(seqTimeApi.timeToSequence, seqTimeApi.allTimes, scheduleData.recurring);

  return schedulerApi.makeAllSequences(
    scheduleData.lessons.reduce((sequences, lessonData) => 
      sequences.concat(seqTimeApi.sequencesFromDuration(
        makeSequenceFromString(
          new Lesson.Lesson(lessonData.name, lessonData.depends), lessonData.sequence
        )
      , lessonData.duration ? lessonData.duration : 1))
    , [])
  );
};

const readScheduleJSONFile = (filePath) => 
  new Promise(function(resolve, reject) {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(parseScheduleFromJSON(data));
      }
    });
  });

module.exports = {
  parseScheduleFromJSON,
  readScheduleJSONFile
}
