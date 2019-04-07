schedule.md: ./schedule.json ./src/buildSchedule
  node ./src/buildSchedule ./schedule.json ./schedule.md

all: schedule.md
