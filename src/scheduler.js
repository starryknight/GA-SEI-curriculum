const { Lesson, Sequence, lessonCompare, sequenceCompare } = require('./lesson.js'); 

const NBLOCKS = 6;
const NUNITS = 4;
const DEFAULTWORKDAYSPERUNIT = [16, 13, 14, 18];



/*
 * startDayOffset is the weekday (0-4 <=> M-F) of day one of the course.
 * The default assumes the first day of a course is on Monday
 */
const isWednesday = (sequence, startDayOffset = 0) => {
  return (sequence.day + startDayOffset) % 5 == 3;
};

const isOutcomesSequence = (sequence) => {
  return isWednesday(sequence) 
    && (sequence.block == 4
      || sequence.block == 5);
};

const isStudyDaySequence = (sequence) => {
  return isWednesday(sequence) 
    && sequence.block >= 1
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
    let k = l.sequence.toString();

    if(!ll[k])
      ll[k] = [l];
    else
      ll[k].push(l); 

    return ll;
  }, {});

  let allLessons = [];
  let l;

  for(let seq of allSequences(DEFAULTWORKDAYSPERUNIT)) {

    let k = seq.toString();

    if(mappedLessons[k])
      l = mappedLessons[k];
    else
      l = [new Lesson(seq)];

    allLessons = allLessons.concat(l.map(x => withStudyDay(withOutcomes(x))));
  }

  return allLessons.sort(lessonCompare);
};

module.exports = {
  makeAllLessons
};
