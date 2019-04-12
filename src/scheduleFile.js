//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');
const Sequence = require('./sequence.js');
const Lesson = require('./lesson.js');
const SequenceTimeApi = require('./timeSequence.js');
const SchedulerApi = require('./scheduler.js');

const lessonFromJSONData = (newSeq) => (jsonData) =>
      new Lesson.Lesson(jsonData.name, jsonData.depends)

const sequenceIntervalFromJSONData = (intervalFromDur, stringToTime) => (jsonData) => {
  let l = lessonFromJSONData(jsonData);

  return intervalFromDur(
    stringToTime(jsonData.sequence), 
    jsonData.duration
  ).map(t => new Sequence.Sequence(l, t));
};

const recurringSequenceIntervalsFromJSONData = (recurInterval, stringToTime) => (jsonData) => {
  let l = lessonFromJSONData(jsonData);

  return recurInterval(
    stringToTime(jsonData.sequence), 
    jsonData.duration, jsonData.step
  ).map(t => new Sequence.Sequence(l, t));
};

const manyFromJSONData = (f, jsonData) =>
  jsonData.map(f).reduce((xs, s) => xs.concat(s), []);

const allSequences = (recurInterval, stringToTime, jsonData) =>
  manyFromJSONData(
    recurringSequenceIntervalsFromJSONData(recurInterval, stringToTime), 
    jsonData.recurring
  ).concat(manyFromJSONData(
    recurringSequenceIntervalsFromJSONData(recurInterval, stringToTime), 
    jsonData.lessons
  );

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

  return schedulerApi.makeAllSequences(
    allSequences(seqTimeApi.recuringIntervals, seqTimeApi.stringToTime, scheduleData);
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
