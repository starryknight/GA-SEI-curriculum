.PHONY=clean
out=./bin
scheduleMarkdown=$(out)/schedule.md

all: $(scheduleMarkdown)

$(out):
	mkdir -p $@

$(scheduleMarkdown): ./sequences/schedule.json ./src/makeSchedule $(out)
	./src/makeSchedule ./sequences/schedule.json > $(out)/schedule.md
