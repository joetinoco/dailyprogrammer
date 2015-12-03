/*
	Challenge name: Start to Rummikub
  Level: Hard
  Objective: Given 14 tiles for the game Rummikub, determine the optimal way to play the tiles arranging them in groups or runs with the most pieces.
  Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3ufwyf/20151127_challenge_242_hard_start_to_rummikub/
*/

// Random piece generator (allows max. of 2 identical pieces)
function randomPiece(pieceSet){
	var newPiece = false;
	var rp = function() { return 'PYRB'.split('')[Math.round(Math.random()*3)] + (Math.floor(Math.random()*13) + 1); }
	if (!pieceSet || pieceSet.length === 0) return rp();
	while (!newPiece || pieceSet.indexOf(newPiece) !== pieceSet.lastIndexOf(newPiece))
		newPiece = rp();
	return newPiece;
}

// Helpers for piece values/colours, # of pieces played, hand scores
function pColor(piece){ return piece.charCodeAt(0) }
function pValue(piece){ return parseInt(piece.substr(1)) }
function pieceCount(hPlayed){
	var pp = 0;
	hPlayed.forEach(function(h){
		pp += h.length;
	});
	return pp;
}
function score(hand){
	var points = 0;
	if (Array.isArray(hand[0])){ // Scores an array of arrays of hands
		hand.forEach(function(h){
			points += score(h);
		});
	} else { // Scores an individual hand
		if (hand.length >= 3){
			points = hand.reduce(function(p,c){
				return p + pValue(c);
			},0);
		}
	}
	return points;
}

// Sorters
var sortForRuns = function(a, b){
	var colorDelta = pColor(a) - pColor(b);
	if (colorDelta == 0)
		return pValue(a) - pValue(b)
	else return colorDelta;
}
var sortForGroups = function(a, b){
	var valueDelta = pValue(a) - pValue(b);
	if (valueDelta == 0)
		return pColor(a) - pColor(b)
	else return valueDelta;
}

// Hand finder
var getHands = function(pieces, sorterFunction){
	var p = pieces.slice().sort(sorterFunction);
	var scoringHands = [], groupColors = [];
	var i = 0, j, hPoints;

	if (p.length < 3) return [];

	while(i < p.length){
		if (sorterFunction === sortForGroups){
			groupColors.push(pColor(p[i]));
			// Detect end of group
			for(j = i + 1; j < p.length; j++){
				if ( pValue( p[i] ) !== pValue( p[j] ) ) break;
				if ( groupColors.indexOf(pColor(p[j])) === -1 ){
					groupColors.push(pColor(p[j]));
				} else break;
			}
		} else {
			// Detect end of run
			for(j = i + 1; j < p.length; j++){
				if ( pColor( p[i] ) !== pColor( p[j] ) ) break;
				if ( pValue( p[i] ) !== pValue( p[j] ) - (j-i) ) break;
			}
		}
		// Store group/run if it is valid (i.e. scores anything)
		if (score(p.slice(i,j))){
			scoringHands.push({
				'hand': p.splice(i,j-i),
				'remaining': p
			});
			p = pieces.slice().sort(sorterFunction);
		}
		i = j;
	}
	return scoringHands;
}


// Challenge part 1 with the bonus: select the starting hand with the most pieces
function bestStartingHand(pieces, hands){
	hands = hands || [];
	var playedHands, playedPieces, bestHands = [], maxPieces = 0, h;
	var handChoices = getHands(pieces, sortForRuns).concat(getHands(pieces, sortForGroups));
	if (handChoices.length === 0){
		return hands;
	} else {
		handChoices.forEach(function(choice){
			h = hands.slice();
			h.push(choice.hand);
			playedHands = bestStartingHand(choice.remaining, h);
			playedPieces = pieceCount(playedHands);
			if (playedPieces > maxPieces){
				maxPieces = playedPieces;
				bestHands = playedHands.slice();
			}
		});
	}
	return bestHands;
}

// Test solution with the challenge input sets
var input = ['P12 P7 R2 R5 Y2 Y7 R9 B5 P3 Y8 P2 B7 B6 B8',
						 'P7 R5 Y2 Y13 R9 B5 P3 P7 R3 Y8 P2 B7 B6 B12'];
// Create a 3rd random set of 14 tiles
var set = [];
for(i = 0; i < 14; i++) set.push(randomPiece(set));
input.push(set.join(' '));

// Evaluate input
input.forEach(function(inp){
	var pieces = inp.split(' '), newPiece;
	var result = bestStartingHand(pieces);
	console.log('Piece set: ' + pieces);
	while (score(result) < 30){ // Challenge part 2: grab tiles until a set can be played
		newPiece = randomPiece(pieces);
		console.log('Grabbed piece: ' + newPiece);
		pieces.push(newPiece);
		result = bestStartingHand(pieces);
	}
	console.log('Viable hands:');
	result.forEach(function(h){
		console.log(h + ', (' + score(h) + ' points)');
	});
	console.log('\n');
});
