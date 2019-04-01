const { Lesson, Sequence, lessonCompare, sequenceCompare }  = require('./lesson.js'); 

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

const setConflictName = (conflictName, lesson) => {
  lesson.name = lesson.name == "TBD" 
  ? conflictName 
  : lesson.name + " - CONFLICT: " + conflictName;

  return lesson;
};

const withLesson = (isConflictSequence, setConflictName, leesson) => {
  return isConflictSequence(lesson.sequence)
    ? setConflictName(lesson)
    : lesson;
};

const withOutcomes = (lesson) => 
  withLesson(isOutcomesSequence, (l) => setConflictName("outcomes", l), lesson);

const withStudyDay = (lesson) => 
  withLesson(isStudyDaySequence, (l) => setConflictName("study-day", l), lesson);

export const makeAllLessons = (lessons) => {
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

const defaultWorkDaysPerUnit = [16, 13, 14, 18];

const lessonToMarkdownTableRow = (lesson) => {
  return `${lesson.sequence.toString()} | [${lesson.name}](${lesson.url})`;
};

export const lessonsToMarkDownTable = (lessons) => {
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
