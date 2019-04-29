/* Provides an API for reading schedule JSON file, parsing it, and generating
 * a full timeline of sequences. 
 *
 * This API consumes a given time API (see ./src/timeSequence.js) and a scheduler
 * (see ./src/scheduler.js) and binds their concepts with the data format of
 * a sequence.
 *
 */

//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');
const Sequence = require('./sequence.js');
const Lesson = require('./lesson.js');
const SequenceTimeApi = require('./timeSequence.js');
const SchedulerApi = require('./scheduler.js');

const lessonFromJSONData = (jsonData) =>
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
    jsonData.duration, 
    jsonData.step
  ).map(t => new Sequence.Sequence(l, t));
};

const manyFromJSONData = (f, jsonData) =>
  jsonData.map(f).reduce((xs, s) => xs.concat(s), []);

const allSequences = (recurInterval, stringToTime, jsonData) =>
  manyFromJSONData(
    sequenceIntervalFromJSONData(recurInterval, stringToTime), 
    jsonData.lessons
  ).concat(manyFromJSONData(
    recurringSequenceIntervalsFromJSONData(recurInterval, stringToTime), 
    jsonData.recurring
  ));

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
const makeAllSequencesFromJSONData = (timeApi, schedulerApi, jsonData) =>
  schedulerApi.makeAllSequences(
    allSequences(timeApi.recuringIntervals, timeApi.stringToTime, jsonData)
  );

const readScheduleJSONFile = (filePath) => 
  new Promise(function(resolve, reject) {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

const makeTimeApiFromJSONData = (jsonData) => 
    new SequenceTimeApi(jsonData.nBlocks, jsonData.unitEndDays);


function makeApi(jsonData) {

  this.timeApi = makeTimeApiFromJSONData(jsonData);

  this.schedulerApi = new SchedulerApi(this.timeApi.allTimes);

  this.allSequences = 
    makeAllSequencesFromJSONData(this.timeApi, this.schedulerApi, jsonData);
};

module.exports = function (filePath) { 
  return readScheduleJSONFile(filePath).then(d => new makeApi(d));
}
