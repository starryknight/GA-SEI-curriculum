const Lesson = require('./lesson.js');
const Sequence = require('./sequence.js');

const makeRecurringSequences = (recuringLessons, tToSeq) => (t) => 
  recuringLessons.map(rl => 
    if(t % rl.block == 0)
      new tToSeq(new Lesson.Lesson(rl.name, []), t)
  );

const makeAllSequences = (sequences) => {
  let seqObj = sequences.reduce((obj, seq) => { 
  }, {});
  
};

module.exports = {
  makeAllLessons
};
