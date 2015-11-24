/*
    Challenge name: Funny plant
    Level: Easy
	  Objective: Given a ficticious plant which fruit can either feed 1 person for a week or be planted to generate another plant in one week, calculate how many weeks are needed to feed a group of X people starting up with Y plants.
	  Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3twuwf/20151123_challenge_242_easy_funny_plant/
*/

function funnyPlant(fNeeded, fInit){
    var plants = [], fruits = fInit, weeks = 1;
    for (var i = 0; i < fInit; i++) plants.push(0);
    while(fruits < fNeeded){
        weeks++;
        fruits = 0;
        plants.forEach(function(e,i,a){ fruits += ++a[i]; });
        for (i = 0; i < fruits; i++) plants.push(0);
    }
    return weeks;
}

console.log(funnyPlant(15,1));
console.log(funnyPlant(200,15));
console.log(funnyPlant(50000,1));
console.log(funnyPlant(150000,250));