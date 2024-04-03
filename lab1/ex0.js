
'use strict';

const words = ["spring", "summer", "a", "ab", "abc", "autumn", "winter"];

for (const word of words) {
    if(word.length < 2)
        console.log("");
    else
        console.log(word[0]+word[1]+word[word.length-2]+word[word.length-1]);
}




