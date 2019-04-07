const { Lesson, Sequence, lessonCompare, sequenceCompare } = require('./lesson.js'); 

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

const withLesson = (isConflictSequence, setConflictName, lesson) => {
  return isConflictSequence(lesson.sequence)
    ? setConflictName(lesson)
    : lesson;
};

const withOutcomes = (lesson) => 
  withLesson(isOutcomesSequence, (l) => setConflictName("outcomes", l), lesson);

const withStudyDay = (lesson) => 
  withLesson(isStudyDaySequence, (l) => setConflictName("study-day", l), lesson);

const makeAllLessons = (lessons) => {
  let mappedLessons = lessons.reduce((ll, l) => { 
    let k = l.sequence.toStringNoSubblock();

    if(!ll[k])
      ll[k] = [l];
    else
      ll[k].push(l); 

    return ll;
  }, {});

  let allLessons = [];
  let l;

  for(let seq of allSequences(defaultWorkDaysPerUnit)) {

    let k = seq.toStringNoSubblock();

    if(mappedLessons[k])
      l = mappedLessons[k];
    else
      l = [new Lesson(seq)];

    allLessons = allLessons.concat(l.map(x => withStudyDay(withOutcomes(x))));
  }

  return allLessons.sort(lessonCompare);
};

const defaultWorkDaysPerUnit = [16, 13, 14, 18];

module.exports = {
  makeAllLessons
};
