const Sequence = require('./sequence.js');

const timeToBlock = (nBlocks) => (t) => (t % nBlocks) + 1;

const timeToDay = (nBlocks) => (t) => Math.ceil(t/nBlocks);

const timeToUnit = (toDay, unitEndDays) => (t) => unitEndDays.findIndex(endDay => toDay(trace(t)) <= endDay)+1

const allTimes = (nBlocks, unitEndDays) => 
  function* () {
    for(let t = 1; t <= nBlocks* unitEndDays[unitEndDays.length-1]; t++)
      yield t;
  };

const timeToSequence = (toUnit, toDay, toBlock) => (lesson, t) => {
  return new Sequence.Sequence(lesson, toUnit(t), toDay(t), toBlock(t));
};

const sequenceToTime = (dToT) => (seq) => dToT(seq.day) + seq.block - 1;

const dayToTime = (nBlocks) => (day) => (day-1) * nBlocks;

const nextSequence = (seqToT, tToSeq) => (seq) => tToSeq(seq.lesson, seqToT(seq)+1);

const trace = (x) => { console.log(x); return x;}

const sequencesFromDuration = (nextSeq) => (seq, duration) => 
  [...new Array(duration)].map(_ => nextSeq(seq));

module.exports = function(nBlocks, unitEndDays) {
  this.dayToTime = dayToTime(nBlocks);
  this.timeToDay = timeToDay(nBlocks);
  this.timeToBlock = timeToBlock(nBlocks);
  this.timeToUnit = timeToUnit(this.timeToDay, unitEndDays);
  this.sequenceToTime = sequenceToTime(this.dayToTime);
  this.timeToSequence = timeToSequence(this.timeToUnit, this.timeToDay, this.timeToBlock);
  this.nextSequence = nextSequence(this.sequenceToTime, this.timeToSequence);
  this.sequencesFromDuration = sequencesFromDuration(this.nextSequence);
  this.allTimes = allTimes(nBlocks, unitEndDays);
};
