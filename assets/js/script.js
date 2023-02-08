var searchFormEl = document.getElementById('search-form');
var searchJobEl = document.getElementById('job-parameter');
var jobsContainerEl = document.getElementById('#jobs-container')

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
function getJobSearch() {
    // var apiKey = "daed771fd0ad16dbb3a9de8575ba1b7d7160d8d32ea4d206975cbbe4464934ce";
    var apiKey1 = "0baa9fe5f5bebece6a9a3c670885ad97f3625e18b3148bb62e59c4df39a2780a";
    var jobs = "";
    var jobsUrl = 'https://www.themuse.com/api/public/jobs?category=Computer%20and%20IT&category=Software%20Engineer&category=Software%20Engineering&level=Entry%20Level&page=1&descending=true$api_key=' + apiKey1;

    fetch(jobsUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            console.log("job-fetch", data)
            displayResults(data);
        })
}

// console.log

// Attempted to write a function to get job results to display on screen but currently no luck with this function below...vvv
// function to display results
// function displayResults(jobs) {
//     console.log(jobs);

//     if (jobs.results === 0) {
//         jobsCard.textContent = 'No Job Listings Found.';
//         return;
//     }

//     for (var i = 0; i < jobs.results[1]; i++) {

//         // Creates a card element for job result
//         var jobsCard = document.createElement ('div');
//         jobsCard.classList.add('card', 'text-is-dark', 'mb-3', 'p-3');
//         // Creates <div> for card content adding bulma class(es)
//         var jobsResultBody = document.createElement('div');
//         jobsResultBody.classList.add('card-content');
//         jobsResultBody.append(jobsCard);
//         // Creats <h3> for the Job Name/Title
//         var jobTitleEl = document.createElement('h3');
//         jobTitleEl.textContent = jobs.results[1].name;
//         // Creates a <p> for company name
//         var companyNameEl = document.createElement('p');
//         companyNameEl.textContent = jobs.results[1].company.name;
//         // creates a <p> for job level
//         var jobLevelEl = document.createElement ('p');
//         jobLevelEl.textContent = jobs.results[1].levels[0].name;
//         // Creates a <p> for job location
//         var jobLocationEl = document.createElement('p');
//         jobLocationEl.textContent = jobs.results[1].locations[0].name;
//         // Creates a <p> for job description
//         var jobDescriptionEl = document.createElement ('p');
//         jobDescriptionEl.textContent = jobs.results[1].contents;

//         jobsResultBody.append(jobTitleEl, companyNameEl, jobLevelEl, jobLocationEl, jobDescriptionEl);
        
//         jobsContainerEl.append(jobsCard)

//     }

// }

// event listener

// local storage

// fetch second API (shibe)
function getShibe() {
    var shibesUrl = 'http://shibe.online/api/shibes?count=[1-100]&urls=[true/false]&httpsUrls=[true/false]'

    fetch(shibesUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log
            console.log("shibe-fetch", data)
            displayShibe(data);
        })
}

function displayShibe (shibe) {

}


// console.log 

searchFormEl.addEventListener('submit', formSubmitHandler);