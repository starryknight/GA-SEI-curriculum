const Lesson = require('./lesson.js');
const Sequence = require('./sequence.js');

const mergeConflictingSequences = (seqs) => {
  let newSeq = seqs.reduce((conflictSeq, seq) => {
    conflictSeq.lesson.name += " " seq.lesson.name;
    return conflictSeq;
  }, seqs.shift());

  newSeq.lesson.name = "CONFLICT:" + newSeq.lesson.name;

  return newSeq;
};

const recurringSequences = (makeRecuring, allTs) => {
  let seqs = [];
  for(let t of allTs()) 
    seqs.concat(makeRecuring(t))

  return seqs;
};

const checkConflictingSequences = (seqs) => {
  if(seqs.length < 1)
    return null;
  else if(seqs.length == 1)
    return seqs[0];
  else
    return mergeConflictingSequences(seqs);
};

const makeRecurringSequences = (recuringLessons, tToSeq) => (t) => 
  recuringLessons.map(rl => 
    if(t % rl.block == 0)
      new tToSeq(new Lesson.Lesson(rl.name, []), t)
  );

const makeAllSequences = (recuringSeqs) => (sequences) => {
  return Object.values(sequences.concat(recuringSeqs).reduce((obj, seq) => { 
    let k = seq.toString();

    if(!obj[k])
      obj[k] = [seq];
    else
      obj[k].push(seq);
  }, {})).map(seqs => checkConflictingSequences);
};

module.exports = function(tToSeq, allTs, recurringLessons) {
  this.makeRecurringSequences = makeRecurringSequences(recuringLessons, tToSeq);
  this.makeAllSequences = makeAllSequences(recurringSequences(this.makeRecurringSequences, allTs))
}
