/*
	Challenge name: VHS recording problem
  Level: Intermediate
  Objective: Given a list of TV shows and their start/end times, determine the optimal way to program a VCR to record the maximum amount of shows. Bonus: accept input files with show names (and display them as they are selected) and consider a "must see" show, i.e., a show that must be taped no matter what.
  Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3u6o56/20151118_challenge_242_intermediate_vhs_recording/
*/

//	Input file:
//	Twin Peaks  (the must-see show)
//	1600 1630 Seinfeld
//	1615 1625 Friends
//	1625 1635 The Wire
//	1630 1700 Twin Peaks
//	1635 1645 Scrubs
//	1700 1800 It's Always Sunny in Philadelphia

var REGEX_LISTITEM = /([0-9]{4})\s([0-9]{4})\s?(.*)/;

// Breaks the input file lines into a show "object" with show data
function getShowData(showString){
    var show = {};
    var data = showString.match(REGEX_LISTITEM);
    show.start = parseInt(data[1]);
    show.end = parseInt(data[2]);
    show.title = data[3] || '';
    return show;
}

// Recursive function to arrange shows in the list into a sequence (the "tape")
function addShows(list, tape, mustSee){
    var tapeOption = [], overlapShows = [], nonOverlapShows = [];
    var newList = [], newTape = [], r, curShow, mustSeeIndex = -1, mustSeeShow;

    if (list.length === 0) {
        return tape;
    } else {
        // Determine which shows overlap the first one on the list.
        overlapShows.push(list.shift());
        while (list.length){
            curShow = list.shift();
            if (curShow.start < overlapShows[0].end){
                overlapShows.push(curShow);
            } else nonOverlapShows.push(curShow);
        }
        // Check if the "must see" show is among the overlapping shows.
        overlapShows.forEach(function(e,i){
            if (e.title === mustSee) mustSeeIndex = i;
        });
        if (mustSeeIndex > -1){
            // If the must show is one of the overlap alternatives,
            // it will become the sole alternative.
            // Any show that overlaps with it will be discarded
            mustSeeShow = overlapShows.splice(mustSeeIndex, 1)[0];
            while (overlapShows.length){
                curShow = overlapShows.shift();
                if (curShow.start >= mustSeeShow.end) nonOverlapShows.push(curShow);
            }
            overlapShows.push(mustSeeShow);
            nonOverlapShows.forEach(function(e,i){
                if (e.start < mustSeeShow.end)
                    nonOverlapShows.splice(i,1);
            });
        }
        // Try different tape options considering each of the overlapping shows.
        for(var i = 0 ; i < overlapShows.length; i++){
            newList = nonOverlapShows.slice();
            newTape = tape.slice();
            newTape.push(overlapShows[i]);
            for (var j = i+1; j < overlapShows.length; j++){
                if (overlapShows[j].start >= overlapShows[i].end)
                    newList.push(overlapShows[j]);
            }
            newList.sort(function(a,b){ return a.start - b.start });
            r = addShows(newList, newTape, mustSee);
            // Return the option that allows taping the most shows.
            if (r.length > tapeOption.length) tapeOption = r.slice();
        }
        return tapeOption;
    }
}

// Parse input
function vhsRecorder(input){
    var shows = [];
    var list = input.split('\n');
    var mustSee = list.shift().trim();
    if (mustSee.match(REGEX_LISTITEM)) {
        list.push(mustSee);
        mustSee = false;
    }
    list.sort().forEach(function(s){
        if (s) shows.push(getShowData(s));
    });

    return addShows(shows, [], mustSee);
}

// Read input file and output results
$.get('input.txt', function(data) {
    vhsRecorder(data).forEach(function(s){
        console.log(s.title || s.start + ' ' + s.end);
    });
});
