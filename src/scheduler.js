const Lesson = require('./lesson.js');
const Sequence = require('./sequence.js');

const mergeConflictingSequences = (seqs) => {
  let initSeq = {...seqs.shift()};
  initSeq.lesson = {...initSeq.lesson};

  let newSeq = seqs.reduce((conflictSeq, seq) => {
    conflictSeq.lesson.name += "-" + seq.lesson.name;

    return conflictSeq;
  }, initSeq);

  newSeq.lesson.name = "CONFLICT:" + newSeq.lesson.name;

  return newSeq;
};


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
    let k = seq.time;

    if(!obj[k])
      obj[k] = [seq];
    else
      obj[k].push(seq);

    return obj;
},{})

const fillHoles = (allTimes) => (seqObj) => {
  for(let t of allTimes()) 
    if(!seqObj[t])
      seqObj[t] = [ new Sequence.Sequence(new Lesson.Lesson(), t) ]

  return seqObj;
};


const makeAllSequences = (fillHoles) => (sequences) =>
  Object.values(fillHoles(asObjects(sequences)))
    .map(checkConflictingSequences)
    .sort(Sequence.sequenceCompare);

module.exports = function(allTs) {
  this.makeAllSequences = makeAllSequences(fillHoles(allTs));
}
