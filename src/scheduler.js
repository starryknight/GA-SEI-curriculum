const Lesson = require('./lesson.js');
const Sequence = require('./sequence.js');

const outComesSeq = (seqApi) => (t) => {
  if(
};

const makeAllSequences = (seqApi) => (sequences) => {
  let seqObj = sequences.reduce((obj, seq) => { 

    obj[seq.toString()] = seq;
    return obj; 
  }, {});
  
};

module.exports = {
  makeAllLessons
};
