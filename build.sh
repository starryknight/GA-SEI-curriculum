#!/usr/bin/env bash

# Dependencies: at least nodejs-8 

# Build script for generating all necessary documents for 
# starting a new cohort.

function buildScheduleMarkdown() {
  node makeSchedule.js ./schedule.json > schedule.md
}

buildScheduleMarkdown
