/*
    Challenge name: Garland words
    Level: Easy
    Objective: Determine the degree of a 'garland word' - a word that start and end with the same N letters in the same order, like 'onion'.
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