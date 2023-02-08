var searchFormEl = document.getElementById('search-form');
var searchJobEl = document.getElementById('job-parameter');

// function for event handler (search button) to retrieve user input
function formSubmitHandler(event) {
    event.preventDefault();

    //Grabbing the search of the user and removing the leading and training white spaces from user input
    var userSearch = searchJobEl.value.trim();
    console.log(userSearch);

    //If statement to check if user presses Search without typing anything or without 
    if (userSearch) {
        getJobSearch(userSearch);
        //Empty search box after running the initial search
        searchJobEl.value = '';
    } else {
        alert('Please select a job category');
    }
}

// function to fetch first API (job search)
function getJobSearch(jobs) {
    var apiKey = "daed771fd0ad16dbb3a9de8575ba1b7d7160d8d32ea4d206975cbbe4464934ce";
    var jobs = "";
    var jobsUrl = 'https://www.themuse.com/api/public/jobs?api_key=' + apiKey;

    fetch(jobsUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log("job-fetch", data)
            getJobSearch(data);
        })
}

// console.log

// function to display results

// event listener

// local storage

// fetch second API (shibe)
function getShibe(shibe) {
    var shibesUrl = 'http://shibe.online/api/shibes?count=[1-100]&urls=[true/false]&httpsUrls=[true/false]'

    fetch(shibesUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("shibe-fetch", data)
            getShibe(data);
        })
}


// console.log 

searchFormEl.addEventListener('submit', formSubmitHandler);