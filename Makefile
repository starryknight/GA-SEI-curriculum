.PHONY=clean
out=./bin
target=$(out)/schedule.md

all: $(target)

clean: 
	rm -r $(out)

$(out):
	mkdir -p $@

$(target): ./schedule.json ./src/buildSchedule $(out)
	./src/buildSchedule ./schedule.json > $(out)/schedule.md

