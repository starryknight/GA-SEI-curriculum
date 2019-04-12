//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');
const Sequence = require('./sequence.js');
const Lesson = require('./lesson.js');
const SequenceTimeApi = require('./timeSequence.js');
const SchedulerApi = require('./scheduler.js');

const stringToSequence = (stringToTime) => (lesson, str) =>
  new Sequence.Sequence(lesson, stringToTime(str))

const lessonFromJSONData = (lessonData) =>
  new Lesson.Lesson(lessonData.name, lessonData.depends)

const sequencesFromJSONData = (newSeq) => (lessonData) =>
  sequencesFromDuration(
    newSeq(lessonFromJSONData(lessonData), lessonData.sequence),
    lessonData.duration ? lessonData.duration : 1
  )

const sequencesFromJSONData = (newSeqs) => (jsonData) =>
  jsonData.lessons.reduce((sequences, lessonData) => 
    sequences.concat(newSeqs(lessonData))
  , [])


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

  let seqTimeApi = 
    new SequenceTimeApi(scheduleData.nBlocks, scheduleData.unitEndDays);

  let schedulerApi = 
    new SchedulerApi(seqTimeApi.timeToSequence, seqTimeApi.allTimes, scheduleData.recurring);

  let newSequences = 
    sequencesFromJSONData(stringToSequence(seqTimeApi.stringToTime));

  return schedulerApi.makeAllSequences(sequencesFromJSONData(newSequences));
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
