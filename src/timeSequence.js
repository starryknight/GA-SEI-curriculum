/* Provides API for managing time in scheduling program
 *
 * including:
 *
 * * unit.day.block string <--> time conversion
 * * day <--> time conversion (where day is a positive integer)
 * * generate time intervals (sequences of times in incrementing order)
 * * generate recurring time intervals that repeat at a given time step
 *
 * Note on time: 
 *
 * Time here is simply an abstract number line to help reify the concept of
 * incrementing events. Literal time (hours minutes and seconds) is not what
 * is being refered to here.
 *
 */
const Sequence = require('./sequence.js');

const timeToBlock = (nBlocks) => (t) => ((t-1) % nBlocks) + 1;

const timeToDay = (nBlocks) => (t) => Math.ceil(t/nBlocks);

const timeToUnit = (toDay, unitEndDays) => (t) => unitEndDays.findIndex(endDay => toDay(t) <= endDay)+1

const dayToTime = (nBlocks) => (day) => (day-1) * nBlocks;

const allTimes = (nBlocks, unitEndDays) => 
  function* () {
    for(let t = 1; t <= nBlocks*unitEndDays[unitEndDays.length-1]; t++)
      yield t;
  };

const timeToSequenceString = (toUnit, toDay, toBlock) => (t) => 
  `${toUnit(t)}.${toDay(t)}.${toBlock(t)}`;

function SequenceFormatException(str) {
  Error.call(this, str + 'sequence should match /^(\d+).(\d+).(\d+)$/');
}

const stringToTime = (dayToTime) => (str) => {
  let pattern = /^(\d+).(\d+).(\d+)$/;

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

const intervalFromDuration = (lastTime) => (t0, duration) => 
  [...Array(duration).keys()].map(t => t + t0).filter(t => t <= lastTime);
  
const recuringIntervals = (intervalFromDur) => (t0, duration, step) => {
  let ts = [];

  let interval = [];

  do {
    interval = intervalFromDur(t0, duration);
    ts.push(interval);
    t0 = t0+step;
  }
  while(interval.length > 0);

  return [].concat(...ts);
};

module.exports = function(nBlocks, unitEndDays) {
  this.allTimes = allTimes(nBlocks, unitEndDays);
  this.dayToTime = dayToTime(nBlocks);
  this.intervalFromDuration = intervalFromDuration(nBlocks*unitEndDays[unitEndDays.length-1]);
  this.recuringIntervals = recuringIntervals(this.intervalFromDuration);
  this.timeToBlock = timeToBlock(nBlocks);
  this.timeToDay = timeToDay(nBlocks);
  this.stringToTime = stringToTime(this.dayToTime);
  this.timeToUnit = timeToUnit(this.timeToDay, unitEndDays);
  this.timeToString = timeToSequenceString(this.timeToUnit, this.timeToDay, this.timeToBlock);
};
