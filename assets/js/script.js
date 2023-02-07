// function for search button

// function to fetch first API (job search)

// console.log

// function to display results

// event listener

// local storage

// fetch second API (shibe)
function getShibe(shibe) {
    var shibesUrl = 'http://shibe.online/api/shibes?count=[1-100]&urls=[true/false]&httpsUrls=[true/false]'
    
    fetch(shibesUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log("shibe-fetch", data)
            getShibe(data);
        })
}


// console.log 