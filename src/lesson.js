//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');

function Lesson(sequence = new Sequence(0,0,0,1), name = 'TBD', url = '', depends = []) {
  this.sequence = sequence; 
  this.name = name;
  this.url = url;
  this.depends = depends;

  this.compareLessonsBySequence = function(b) {
    return this.sequence.compareSequence(b.sequence);
  }
};

const lessonCompare = (a,b) => a.compareLessonsBySequence(b);

const parseLessonsFromJSON = (calendarJSON) => { 
  let lessons = JSON.parse(calendarJSON);
  return lessons.map(l => new Lesson(makeSequenceFromString(l.sequence), l.name, l.url, l.depends));

};

//reads calendar file. Transparent promise wrapper around readFile
const readLessonsFile = (filePath) => 
  new Promise(function(resolve, reject) {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        reject(err)
      } else {

        resolve(parseLessonsFromJSON(data));
      }
    });
  });

const jsonFriendlyLesson = (lesson) => {
  let x = {...lesson};
  x.sequence = x.sequence.toString();

  return x;
};

const printLessons = (lessons) => {
  lessons
  .forEach(l =>
    console.log(`${l.sequence.toString()} ${l.name} ${l.url}`)
  );
};

function Sequence(unit, day, block, subblock) {
    this.unit = unit;
    this.day = day; 
    this.block = block;
    this.subblock = subblock;

    this.toString = function() {
      return makeSequenceString(this.unit, this.day, this.block, this.subblock);
    }

    this.toStringNoSubblock = function() {
      return makeSequenceString(this.unit, this.day, this.block);
    }

    this.compareSequence = function(b) {
      return Math.sign(
        8*Math.sign(this.unit - b.unit)
        + 4*Math.sign(this.day - b.day)
        + 2*Math.sign(this.block - b.block)
        + Math.sign(this.subblock - b.subblock)
      );
    }

    this.compareSequenceIgnoreSubblock = function(b) {
      return Math.sign(
        4*Math.sign(this.unit - b.unit)
        + 2*Math.sign(this.day - b.day)
        + Math.sign(this.block - b.block)
      );
    }
}

function SequenceFormatException(str) {
  this.value = str;
  this.message = 'sequence should match /^(\d+).(\d+).(\d+)$/';
  this.toString = function () { this.value + ' ' + this.message };
}

const makeSequenceFromString = (str) => {
  let pattern = /^(\d+).(\d+).(\d+)(.(\d+))?$/

  let result = pattern.exec(str);

  if(result)
  {
    return new Sequence(Number.parseInt(result[1], 10),
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

const makeSequenceString = (unit, day, block, subblock = 1) => {
  return `${unit}.${day}.${block}.${subblock}`;
}

const sequenceCompare = (a,b) => a.compareSequence(b);

module.exports = {
  Lesson,
  Sequence,
  SequenceFormatException,
  lessonCompare,
  makeSequenceFromString,
  makeSequenceString,
  parseLessonsFromJSON,
  readLessonsFile,
  sequenceCompare,
  jsonFriendlyLesson,
  printLessons
}
