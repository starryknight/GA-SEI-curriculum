const timeToBlock = (nBlocks) => (t) => (t % nBlocks) + 1;

const timeToDay = (nBlocks) => (t) => Math.ceil(t/nBlocks);
const dayToTime = (nBlocks) => (day) => (day-1) * nBlocks;

const timeToUnit = (nBlocks, unitEndDays) => (t) => unitEndDays.findIndex(endDay => endDay - timeToDay(nBlocks)(t) <= 0)

const timeToSequence = (toUnit, toDay, toBlock) => (lesson, t) => {
  return new Sequence(lesson, toUnit(t), toDay(t), toBlock(t));
};

const sequenceToTime => (dToT) => (seq) => dToT(seq.day) + seq.block - 1;

const nextSequence => (seqToT, tToSeq) => (seq) => tToSeq(seq.lesson, seqToT(seq)+1);

const sequencesFromDuration = (nextSeq) => (seq, duration) => 
  [...new Array(duration)].map(_ => nextSeq(seq));


module.exports = function(nBlocks, unitEndDays) {
  this.sequenceToTime = sequenceToTime(dayToTime(nBlocks));
  this.timeToSequence = timeToSequence(timeToUnit(nBlocks, unitEndDays), timeToDay(nBlocks), timeToBlock(nBlocks));
  this.nextSequence = nextSequence(this.sequenceToTime, this.timeToSequence);
  this.sequencesFromDuration = sequencesFromDuration(this.nextSequence);
};
