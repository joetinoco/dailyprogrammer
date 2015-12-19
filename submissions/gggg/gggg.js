/*
    Challenge name: "Gggg" language encoder
    Level: Intermediate
    Objective: Develop a program that encodes/decodes a fictitious language composed only of the letter "g".
    Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3x3hqa/20151216_challenge_245_intermediate_ggggggg_gggg/
*/

function gEncode(msg){
  var key = {}, chr, i = 0, encoded = '', keyStr = '';
  var arrMsg = msg.split('');
  var codeLength = msg.replace(/\W/g,'').split('').sort().join('')
    .replace(/(.)\1+/g,'$1').length.toString(2).length;

  while(chr = arrMsg.shift()){
    if(chr.match(/\w/g)){
      if(!key[chr]){
        key[chr] = i.toString(2).replace(/0/g,'g').replace(/1/g,'G');
        while(key[chr].length < codeLength) key[chr] = 'g' + key[chr];
        keyStr += chr + ' ' + key[chr] + ' ';
        i++;
      }
      encoded += key[chr];
    } else encoded += chr;
  }

  return {
    keys: keyStr,
    encodedMsg: encoded
  };
}

function gDecode(strKey, msg){
  var key = {}, i, j, chunk, decoded;
  var aux = strKey.split(' ');

  for(i = 0; i < aux.length; i += 2){
    key[aux[i+1]] = aux[i];
  }

  i = 0, j = 1, decoded = '';
  while( i+j <= msg.length){
    chunk = msg.substr(i,j);
    if (chunk.match(/[gG]+/)){
      if (key[chunk]){
        decoded += key[chunk];
        i += j, j = 1;
      } else {
        j++;
      }
    } else {
      decoded += chunk;
      i++, j = 1;
    }
  }

  return decoded;
}

var testString = 'hooray /r/dailyprogrammer!';
var encResult = gEncode(testString);
console.log(encResult.keys);
console.log(encResult.encodedMsg);
console.log(gDecode(encResult.keys, encResult.encodedMsg));