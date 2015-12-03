/*
	Challenge name: Jenny's Fruit Basket
  Level: Intermediate
  Objective: Given a list of fruits and their prices, determine all possible combinations of fruits in "baskets" that cost exactly $5.
  Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3v4zsf/20151202_challenge_243_intermediate_jennys_fruit
*/

// Input file: fruits and their prices (in cents)
//////////////////////////////////////////////////
// banana 32
// kiwi 41
// mango 97
// papaya 254
// pineapple 399

function fruitBaskets(prices, baskets, curBasket, curPrice){
    var combination;
    if (curPrice === 500){
        combination = curBasket.slice().join('-');
        if (baskets.indexOf(combination) === -1) baskets.push(combination);
    } else if (curPrice < 500){
        prices.forEach(function(f, i){
            if (curPrice + f <= 500){
                curBasket[i]++;
                fruitBaskets(prices, baskets, curBasket, curPrice + f);
                curBasket[i]--;
            }
        });
    }
}

$.get('input.txt', function(data) {
    var p = data.split('\n');
    var names = [], prices = [], baskets = []
    var qtdFruit = p.length, curBasket;
    var t0, t1;
    p.forEach(function(e,i){
        names[i] = e.split(' ')[0];
        prices[i] = parseInt(e.split(' ')[1]);
    });
    curBasket = [qtdFruit];
    for(i=0; i < qtdFruit; i++) curBasket[i] = 0;

    t0 = performance.now();
    fruitBaskets(prices, baskets, curBasket, 0);
    baskets.forEach(function(basketChoice){
        var output = '';
        basketChoice.split('-').forEach(function(qtd, i){
            if (qtd > 0){
                output += qtd + ' ' + names[i] + (qtd > 1 ? 's, ' : ', ');
            }
        });
        console.log(output.slice(0,-2));
    });

    t1 = performance.now();
    console.log('Processing time: ' + Math.floor(t1 - t0) + ' ms');
});
