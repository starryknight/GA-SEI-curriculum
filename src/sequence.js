function Sequence(lesson, time) {
    this.time = time;
    this.lesson = lesson;
}

const sequenceCompare = (a,b) => a.time <= b.time;

const printSequence = (sequence) => {
  console.log(`${sequence.toString()} ${sequence.lesson.name} `)
};

const printSequences = (sequences) => sequences.forEach(printSequence);

module.exports = {
  Sequence,
  sequenceCompare,
  printSequence,
  printSequences
}
