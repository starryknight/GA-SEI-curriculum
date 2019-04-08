.PHONY=clean
out=./bin
scheduleMarkdown=$(out)/schedule.md

all: $(scheduleMarkdown)

clean: 
	rm -r $(out)

$(out):
	mkdir -p $@

$(scheduleMarkdown): ./schedule.json ./src/makeSchedule $(out)
	./src/makeSchedule ./schedule.json > $(out)/schedule.md
