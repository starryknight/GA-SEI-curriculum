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
  return {
    name: lesson.name, 
    sequence: lesson.sequence.toString(), 
    depends: lesson.depends
  };

};

const printLessons = (lessons) => {
  lessons
  .forEach(l =>
    console.log(`${l.sequence.toString()} ${l.name} ${l.url}`)
  );
};

function Sequence(unit, day, block) {
    this.unit = unit;
    this.day = day; 
    this.block = block;

    this.toString = function() {
      return makeSequenceString(this.unit, this.day, this.block);
    }

    this.toStringNoSubblock = function() {
      return makeSequenceString(this.unit, this.day, this.block);
    }

    this.compareSequence = function(b) {
      return Math.sign(
        4*Math.sign(this.unit - b.unit)
        + 2*Math.sign(this.day - b.day)
        + Math.sign(this.block - b.block)
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

const makeSequenceString = (unit, day, block) => {
  return `${unit}.${day}.${block}`;
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
