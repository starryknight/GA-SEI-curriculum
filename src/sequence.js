function Sequence(lesson, unit, day, block) {
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
  console.log(`${sequence.toString()} ${sequence.lesson.name} `)
};

const printSequences = (sequences) => sequences.forEach(printSequence);

module.exports = {
  Sequence,
  makeSequenceString,
  sequenceCompare,
  printSequence,
  printSequences
}
