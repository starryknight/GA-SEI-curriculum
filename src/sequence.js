const Lesson = require('./src/lesson.js');

const blockTime = (nBlocks) => (t) => (t % nBlocks) + 1;
const dayTime = (nBlocks) => (t) => Math.ceil(t/nBlocks)
const unitTime = (nBlocks, unitEndDays) => (t) => unitEndDays.findIndex(endDay => endDay - dayTime(nBlocks)(t) <= 0)

const allSequences = (unitEndDays = [], nBlocks) =>
  function* (startUnit, startDay, startBlock) {
  yield {unit: startUnit, day, block: startBlock};
  }

const nextSequence = (allSequenceGen, {...lesson, unit, day, block}) => {
    let newSeq = allSequenceGen(unit,day,block).next().value;

    return new Sequence(lesson, newSeq.unit, newSeq.day, newSeq.block);
  };
}


function Sequence(lesson = new Lesson.Lesson(), unit, day, block) {
    this.unit = unit;
    this.day = day; 
    this.block = block;
    this.lesson = lesson;

    this.toString = function() {
      return makeSequenceString(this.unit, this.day, this.block);
    }

    this.compareSequence = function(b) {
      return Math.sign(
        4*Math.sign(this.unit - b.unit)
        + 2*Math.sign(this.day - b.day)
        + Math.sign(this.block - b.block)
      );
    }
}

const makeSequenceString = (unit, day, block) => {
  return `${unit}.${day}.${block}`;
}

const sequenceCompare = (a,b) => a.compareSequence(b);

const printSequence = (sequence) => {
  console.log(`${sequence.toString()} ${sequence.lesson.name} ${sequence.lesson.url}`)
};

const printSequences = (sequences) => sequences.forEach(printSequence);

module.exports = {
  Sequence,
  SequenceFormatException,
  makeSequenceFromString,
  makeSequenceString,
  sequenceCompare,
  printSequence,
  printSequences
}
