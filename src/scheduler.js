const Lesson = require('./lesson.js');
const Sequence = require('./sequence.js');

const mergeConflictingSequences = (seqs) => {
  let newSeq = seqs.reduce((conflictSeq, seq) => {
    conflictSeq.lesson.name += " " + seq.lesson.name;
    return conflictSeq;
  }, seqs.shift());

  newSeq.lesson.name = "CONFLICT:" + newSeq.lesson.name;

  return newSeq;
};

const makeRecurringSequences = (recuringLessons, tToSeq) => (t) => 
  recuringLessons.map(rl => 
    (t % rl.block == 0)
      ? tToSeq(new Lesson.Lesson(rl.name, []), t)
      : []
  );

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

const makeAllSequences = (recuringSeqs) => (sequences) => {
  return Object.values(sequences.concat(recuringSeqs).reduce((obj, seq) => { 
    let k = seq.toString();

    if(!obj[k])
      obj[k] = [seq];
    else
      obj[k].push(seq);

    return obj;
  }, {})).map(seqs => checkConflictingSequences);
};

module.exports = function(tToSeq, allTs, recuringLessons) {
  this.makeRecurringSequences = makeRecurringSequences(recuringLessons, tToSeq);
  this.makeAllSequences = makeAllSequences(recurringSequences(this.makeRecurringSequences, allTs))
}
