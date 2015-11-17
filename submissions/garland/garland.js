/*
    Challenge name: Garland words
    Level: Easy
    Objective: A 'garland word' is a word that start and end with the same N letters in the same order, like 'onion', and thus can be chained in a garland-like structure like "onionionionionion...". The challenge is to determine the degree of a garland word, i.e., how many letters repeat at the beginning and end. 'Onion' is degree 2 because 'on' is the repeating part.
    Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3d4fwj/20150713_challenge_223_easy_garland_words/
*/

function garland(input){
    var degree = 0;
    for(i=input.length-1; i>1; i--){
        var testchain = "";
        while (testchain.length < input.length)
            testchain += input.substr(0,i);
        if (testchain.includes(input))
            degree = input.length - i;
    }
    return degree;
}

console.log(garland("programmer")); // 0
console.log(garland("ceramic")); // 1
console.log(garland("onion")); // 2
console.log(garland("alfalfa")); // 4