out=./bin
scheduleMarkdown=$(out)/schedule.md

.PHONY: clean mono

all: $(scheduleMarkdown)

$(out):
	mkdir -p $@

clean:
	rm -r $(out)

$(scheduleMarkdown): ./sequences/schedule.json ./src/makeSchedule $(out)
	./src/makeSchedule ./sequences/schedule.json > $(out)/schedule.md

mono: ./oldSchedule.json $(out)
	./src/makeMono ./oldSchedule.json > $(out)/schedule.json
	./src/makeSchedule $(out)/schedule.json > $(out)/schedule.md

