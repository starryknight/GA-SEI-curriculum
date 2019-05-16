out=./sequences
in=./sequences
scheduleMarkdown=$(out)/schedule.md

.PHONY: clean mono

all: $(scheduleMarkdown)

$(out):
	mkdir -p $@

$(scheduleMarkdown): $(in)/schedule.json ./src/makeSchedule $(out)
	./src/makeSchedule $(in)/schedule.json > $(out)/schedule.md
