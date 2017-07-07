var scrape = require('html-metadata');
 
var url = "https://hiddenremote.com/2017/06/19/four-problems-wonder-woman-movie/";
 
scrape(url, function(error, metadata){
    // console.log(metadata);
    // console.log(typeof metadata);
    console.log(metadata["openGraph"]);
});

