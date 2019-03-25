//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');

//parses calendar fromJSON
const parseLessons = (calendarJSON) => { 
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

        resolve(parseLessons(data));
      }
    });
  });

function SequenceFormatException(str) {
  str = str.trim();

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

function Sequence(unit, day, block, subblock) {
    this.unit = unit;
    this.day = day; 
    this.block = block;
    this.subblock = subblock;

    this.toString = function() {
      return makeSequenceString(this.unit, this.day, this.block, this.subblock);
    }

    this.compareSequence = function(b) {
      return Math.sign(
        8*Math.sign(this.unit - b.unit)
        + 4*Math.sign(this.day - b.day)
        + 2*Math.sign(this.block - b.block)
        + Math.sign(this.subblock - b.subblock)
      );
    }
}

const makeSequenceString = (unit, day, block, subblock = 1) => {
  return `${unit}.${day}.${block}.${subblock}`;
}

const sequenceCompare = (a,b) => a.compareSequence(b);

function Lesson(sequence = new Sequence(0,0,0,1), name = 'TBD', url = '', depends = []) {
  this.sequence = sequence; 
  this.name = name;
  this.url = url;
  this.depends = depends;

  this.compareLessonsBySequence = function(b) {
    return this.sequence.compareSequence(b.sequence);
  }
};

const asSequenceObj = (lessons) =>
  lessons.reduce((o, lesson) => { o[lesson.sequence.toString()] = lesson; return o; }, {});

const lessonToMarkdownTableRow = (lesson) => {
  return `${lesson.sequence.toString()} | [${lesson.name}](${lesson.url})`;
};

const lessonCompare = (a,b) => a.compareLessonsBySequence(b);

function* blockGen(startBlock = 1) {
  for(; startBlock <= 4; startBlock++)
    yield startBlock;
}

function* dayGen(nDays = 60) {
  for(let startDay = 1; startDay <= nDays; startDay++)
    yield startDay;
}

function* unitGen(startUnit = 1) {
  for(; startUnit <= 4; startUnit++)
    yield startUnit;
}

function* allSequences(nDays = [15, 15, 15, 15], startBlock = 1, startDay = 1, startUnit = 1) {
  let day = 0;
  for(let unit of unitGen(startUnit))
    for(let d of dayGen(nDays[unit-1]))
    {
      day++;
      for(let block of blockGen(startBlock))
        yield new Sequence(unit, day, block, 1);
    }
}

const defaultWorkDaysPerUnit = [16, 13, 14, 18];

const isWednesday = (sequence) => {
  return sequence.day % 5 == 3;
};

const isOutcomesSequence = (sequence) => {
  return isWednesday(sequence) 
    && sequence.subblock < 2
    && sequence.block == 3;
};

const isStudyDaySequence = (sequence) => {
  return isWednesday(sequence) 
    && sequence.block > 1
    && !isOutcomesSequence(sequence);
};

const makeStudyDayLesson = (lesson) => {
  lesson.name = lesson.name == "TBD" 
    ? "study-day" 
    : lesson.name + " - CONFLICT: study-day";

  return lesson;
};

const withStudyDay = (lesson) => {
  return isStudyDaySequence(lesson.sequence)
    ? makeStudyDayLesson(lesson)
    : lesson;
};

const makeOutcomesLesson = (lesson) => {
  lesson.name = lesson.name == "TBD" 
    ? "outcomes" 
    : lesson.name + " - CONFLICT: outcomes";

  return lesson;
};

const withOutcomes = (lesson) => {
  return isOutcomesSequence(lesson.sequence)
    ? makeOutcomesLesson(lesson)
    : lesson;
};

const makeAllLessons = (lessons) => {
  let sortedLessons = lessons.sort(lessonCompare);

  let nextLesson = sortedLessons.shift();

  let allLessons = [];

  for(let seq of allSequences(defaultWorkDaysPerUnit)) {

    let l = {};

    if(!nextLesson || nextLesson.sequence.compareSequence(seq) != 0) {
      l = new Lesson(seq);
    } else {
      l = nextLesson;
      nextLesson = sortedLessons.shift();
    }

    allLessons.push(withStudyDay(withOutcomes(l)));
  }
  
  return allLessons;
};

const lessonsToMarkDownTable = (lessons) => {
  return "# SEI Schedule"
    + "\n\n_Note: see below the table for details on Sequence_"
    + "\n\n<!-- __DO NOT MANUALLY EDIT__ Instead use `index.js` -->"
    + "\n\n<!-- Generated on: " + new Date() + " -->"
    + "\n\nSequence (Unit.Day.Block.Subblock) | Link"
    + lessons.reduce((str, lesson) => str + ((str === '' ? '' : '\n') + lessonToMarkdownTableRow(lesson)), '\n--- | ---')
    + "\n\n### Sequences "
    + "\n\nSequences are semantic strings describing when a part of the course is to occur. The format is: `Unit.Day.Block` where:"
    + "\n\nSequence Part | Meaning"
    + "\n--- | ---"
    + "\nUnit | Scale: 1-4, the unit the lesson is taught in"
    + "\nDay | Scale: 1-infinity, the day with respect to the start of the course the lesson is taught in"
    + "\nBlock | Scale: 1-4, the time block the lesson is taught in"
    + "\n\nWhere block is has the following values"
    + "\n\nBlock Number | Meaning"
    + "\n\nSubblock | 1-2 the first and second halves of a block (rarely used)"
    + "\n--- | ---"
    + "\n1 | Morning Excersises"
    + "\n2 | Session 1"
    + "\n3 | Session 2"
    + "\n4 | Homework"
    
};

let scheduleJSONFilePath = process.argv[2];

if(scheduleJSONFilePath)
  readLessonsFile(scheduleJSONFilePath)
    .then(lessons => 
      console.log(
        lessonsToMarkDownTable(
          makeAllLessons(lessons)
        )
      )
    );
