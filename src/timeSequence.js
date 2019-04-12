const Sequence = require('./sequence.js');

const timeToBlock = (nBlocks) => (t) => (t % nBlocks) + 1;

const timeToDay = (nBlocks) => (t) => Math.ceil(t/nBlocks);

const timeToUnit = (toDay, unitEndDays) => (t) => unitEndDays.findIndex(endDay => toDay(t) <= endDay)+1

const dayToTime = (nBlocks) => (day) => (day-1) * nBlocks;

const allTimes = (nBlocks, unitEndDays) => 
  function* () {
    for(let t = 1; t <= nBlocks* unitEndDays[unitEndDays.length-1]; t++)
      yield t;
  };

const timeToSequenceString = (toUnit, toDay, toBlock) => (t) => 
  `${toUnit(t)}.${toDay(t)}.${toBlock(t)}`;

function SequenceFormatException(str) {
  Error.call(this, str + 'sequence should match /^(\d+).(\d+).(\d+)$/');
}

const stringToTime = (dayToTime) => (str) => {
  let pattern = /^\d+.(\d+).(\d+)$/;

  let result = pattern.exec(str);

  if(result)
  {
    return dayToTime(Number.parseInt(result[2], 10))
      + Number.parseInt(result[3], 10);
  }
  else
  {
    throw new SequenceFormatException(str); 
  }
}

const nextSequence = (step, seq) => new Sequence.Sequence(seq.lesson, seq.time+step) 

const sequencesFromDuration = (nextSeq) => (seq, duration) => {
  let seqs = [seq];

  for(let i = 1; i < duration; i++)
    seqs.push(nextSeq(1, seqs[i])); 

  return seqs;
};

const recurringSequence = (nBlocks, lastBlock) => (seq) => {

  let newSeqs = [seq];

  while(newSeqs[newSeqs.length-1].time <= lastBlock)
    newSeqs.push(nextSequence(5, newSeqs[newSeqs.length-1]));

  return newSeqs;
};

module.exports = function(nBlocks, unitEndDays) {
  this.allTimes = allTimes(nBlocks, unitEndDays);
  this.dayToTime = dayToTime(nBlocks);
  this.nextSequence = nextSequence;
  this.recurringSequence = recurringSequence(nBlocks, unitEndDays[unitEndDays-1])
  this.sequencesFromDuration = sequencesFromDuration(this.nextSequence);
  this.stringToTime = sequenceToTime(this.dayToTime);
  this.timeToBlock = timeToBlock(nBlocks);
  this.timeToDay = timeToDay(nBlocks);
  this.timeToSequenceString = timeToSequenceString(this.timeToUnit, this.timeToDay, this.timeToBlock);
  this.timeToUnit = timeToUnit(this.timeToDay, unitEndDays);
};
