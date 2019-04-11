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

const timeFromString = () => (str) => {
  let pattern = /^(\d+).(\d+).(\d+)$/;

  let result = pattern.exec(str);

  if(result)
  {
    return new Sequence.Sequence(lesson, Number.parseInt(result[1], 10),
      Number.parseInt(result[2], 10),
      Number.parseInt(result[3], 10),
      result[5] ? Number.parseInt(result[5], 10) : 1
    );
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
