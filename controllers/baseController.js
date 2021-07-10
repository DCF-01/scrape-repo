const cheerio = require('cheerio');
const ogs = require('open-graph-scraper');

function handleGet(data, url){

    return getFromData(data, url);
}

function getFromData(data, url){
    let returnObj = {
        context: 'NEUTRAL',
        title: 'empty',
        crypto: 'empty',
        img: 'none',
    }


    //open graph scrape 
    const options = { url: url };
    ogs(options)
        .then((data) => {
            returnObj.img = data.ogImage
        });



    let title = data.split('<title>')[1].split('</title>')[0];
    let cryptoArr = ['bitcoin', 'ethereum', 'tether', 'xrp', 'dogecoin', 'cardano'];

    let matchedItems = [];

    for(item of cryptoArr){
        //create new RegEx for each item in cryptoArr
        let singleWordRegEx = new RegExp('\\b'+ item +'\\b');

        //lowercase title and test if it contains regex
        let lowerCaseTitle = title.toLowerCase();
        let isMatchted = singleWordRegEx.test(lowerCaseTitle);

        //if true push to matchedItems Arr
        if(isMatchted){
            matchedItems.push(item);
        }
    }

    
    //split on whitespace
    let dataArr = data.split(/\s/);
    let posWordsToMatch = ['rising'];
    let negWordsToMatch = ['falling'];

    let posArr = dataArr.filter(word => posWordsToMatch.includes(word));
    let negArr = dataArr.filter(word => negWordsToMatch.includes(word));

    
    returnObj.title = title;
    if(matchedItems.length >= 1){
        //always returns first item of matchedItems
        returnObj.crypto = matchedItems[0];
    }

    //check for pos / neg  | else it remains NEUTRAL
    if(posArr.length > negArr.length){
        returnObj.context = 'POSITIVE';
    }
    else if(posArr.length < negArr.length){
        returnObj.context = 'NEGATIVE';
    }
    console.log(url);
    return returnObj;
}


module.exports = {
    handleGet
}