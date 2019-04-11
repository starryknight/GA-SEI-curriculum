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


const makeRecurringSequences = (recuringSeqs, lastTime, seqToTime, timeToSeq) =>
  recuringLessons.reduce((seqs, rs) => {

    for(let t = seqToTime(rs); t <= lastTime; t+=5) {
    }

    return seqs;
  }, []);

const checkConflictingSequences = (seqs) => {
  if(seqs.length < 1)
    return null;
  else if(seqs.length == 1)
    return seqs[0];
  else
    return mergeConflictingSequences(seqs);
};

const asObjects = (sequences) => 
  sequences.reduce((obj, seq) => {
    let k = seq.toString();

    if(!obj[k])
      obj[k] = [seq];
    else
      obj[k].push(seq);

    return obj;
},{})


const makeAllSequences = (makeRecuring, allTs, tToSeq) => (sequences) => {
  let seqObj = asObjects(sequences);

  for(let t of allTs()) {
    let seqs = makeRecuring(t);

    if(seqs.length == 0)
      seqs = [ tToSeq(new Lesson.Lesson(), t) ];

    let k = seqs[0].toString();

    if(!seqObj[k])
      seqObj[k] = seqs;
    else
      seqObj[k].concat(seqs);
  }
  
  return Object.values(seqObj).map(checkConflictingSequences).sort(Sequence.sequenceCompare);
};

module.exports = function(tToSeq, allTs, recuringLessons) {
  this.makeRecurringSequences = makeRecurringSequences(recuringLessons, tToSeq);
  this.makeAllSequences = makeAllSequences(this.makeRecurringSequences, allTs, tToSeq);
}
