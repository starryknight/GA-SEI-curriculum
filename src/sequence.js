function Sequence(lesson, time) {
    this.time = time;
    this.lesson = lesson;
}

const sequenceCompare = (a,b) => a.time <= b.time;

const printSequence = (timeToString, sequence) => {
  console.log(`${timeToString(sequence.time)} ${sequence.lesson.name} `)
};

module.exports = {
  Sequence,
  sequenceCompare,
  printSequence,
}
