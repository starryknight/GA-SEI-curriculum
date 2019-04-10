//NOTE: since 2019-03-18, fs.promises is experimental
const fs = require('fs');
const Sequence = require('./sequence.js');
const Lesson = require('./lesson.js');


function SequenceFormatException(str) {
  Error.call(this, str + 'sequence should match /^(\d+).(\d+).(\d+)$/');
}

const makeSequenceFromString = (lesson = new Lesson.Lesson(), str) => {
  let pattern = /^(\d+).(\d+).(\d+)(.(\d+))?$/;

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

const sequencesFromDuration(startSequence, duration) => {
  //TODO: gen new sequences keeping starting block and day in mind
  //for(let block of Sequence.blockGen(startSequence
}

const parseLessonsFromJSON = (rawJSON) => { 
  let lessons = JSON.parse(rawJSON);
  return lessons.reduce((sequences, lessonData) => 
    sequences.concat(sequencesFromDuration(
      makeSequenceFromString(new Lesson.Lesson(l.name, l.depends), l.sequence)
    ))
  , []);
};

//reads calendar file. Transparent promise wrapper around readFile
const readLessonsFile = (filePath) => 
  new Promise(function(resolve, reject) {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        reject(err)
      } else {

        resolve(parseLessonsFromJSON(data));
      }
    });
  });



