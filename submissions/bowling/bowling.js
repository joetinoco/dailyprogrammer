/*
    Challenge name: Scoring a bowling game
    Level: Intermediate
	Objective: Determine a bowling score from a string representing a score sheet, i.e., 'X -/ X 5- 8/ 9- X 81 1- 4/X', where a / represents a spare and an X represents a strike. The program must take into account all bowling rules, including doubling points for the next ball if the previous one was a spare, and doubling the next two balls if the previous one was a strike.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3ntsni/20151007_challenge_235_intermediate_scoring_a/
*/

function scoreGame(input){
    var frames = input.match(/[1-9X\-\/]{1,3}/g);
    var balls = [], score = 0;

    frames.forEach(function(e,i){
        var last = 0;
        if (e[0] === "X"){
            balls.push({ 'pins': 10, 'strike': true });
        } else {
            if (e[0] !== "-"){
                last = parseInt(e[0]);
                balls.push({ 'pins': last });
            } else balls.push({ 'pins': 0 });

            if (e[1] === "/"){
                balls.push({ 'pins': 10 - last, 'spare': (i !== 9 ? true : false) }); // No bonus @ the last frame
            } else if (e[1] !== "-"){
                balls.push({ 'pins': parseInt(e[1]) });
            } else if (e[1] === "X"){ // 2nd ball last frame, no bonus awarded
                balls.push({ 'pins': 10 });
            } else balls.push({ 'pins': 0 });
        }

        if (e[2]){ // 3rd ball, last frame
            if (e[2] === "X"){ 
                balls.push({ 'pins': 10 });
            } else if (e[2] !== "-"){
                balls.push({ 'pins': parseInt(e[2]) });
            }
        }
    });

    while (balls.length < 21) balls.push({ 'pins': 0 });

    balls.forEach(function (e,i){
        score += e.pins;
        if (e.strike) score += balls[i+1].pins + balls[i+2].pins;
        if (e.spare) score += balls[i+1].pins;
    });
    return score;
}

["X -/ X 5- 8/ 9- X 81 1- 4/X",
"62 71  X 9- 8/  X  X 35 72 5/8",
"X X X X X X X X X XXX"].forEach(function(e){
    console.log(scoreGame(e));
});