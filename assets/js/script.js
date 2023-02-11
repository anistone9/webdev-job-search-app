var searchFormEl = document.getElementById('search-form');
var searchJobEl = document.getElementById('job-parameter');
var jobsContainerEl = document.getElementById('jobs-container');
var jobCardEl = document.getElementById('job-cards');
// var shibePrintEl = document.getElementById('print-shibes');

  // var api = 'https://www.themuse.com/api/public/jobs?q=';
  // var jobSearch = "";
  // var pageLoad = '&page=1&descending=true';
  // var apiKey = "daed771fd0ad16dbb3a9de8575ba1b7d7160d8d32ea4d206975cbbe4464934ce";
  var apiKey1 = "&api_key=0baa9fe5f5bebece6a9a3c670885ad97f3625e18b3148bb62e59c4df39a2780a";

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
    }
}

// function to fetch first API (job search)
function getJobSearch(userJobs) {

//    var jobsUrl = api + userJobs + pageLoad + apiKey1
var jobsUrl = `https://www.themuse.com/api/public/jobs?category=${userJobs}&page=1&descending=true` + apiKey1

    fetch(jobsUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (jobsData) {
                    console.log(jobsData);
                    displayResults(jobsData);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log(error);
            alert('Unable to reach jobs url');
        })
}

// function to display results
function displayResults(jobResults) {
    //If user typed incorrect entry, return 
    if (jobResults.length === 0) {
        return;
    }

    var titleEl = document.createElement('h2');
    titleEl.innerHTML = 'Search results: ';
    jobsContainerEl.appendChild(titleEl);
    console.log(titleEl);

    for (var i = 0; i < 10; i++) {
        //Create a new div for all the results, in order to add a border and style the list
        var resultsList = document.createElement('div');

        var jobTitle = document.createElement('p');
        var jobCompany = document.createElement('p');
        var jobDate = document.createElement('p');
        var jobCategory = document.createElement('p');
        var jobLevel = document.createElement('p');
        var jobDescription = document.createElement('p');
        var shortDescription = document.createElement('p');

        var titleData = jobResults.results[i].name;
        jobTitle.innerHTML = 'Job Title: ' + titleData;
        resultsList.appendChild(jobTitle);

        var companyData = jobResults.results[i].company.name;
        jobCompany.innerHTML = 'Company: ' + companyData;
        resultsList.appendChild(jobCompany);

        var newDate = new Date(jobResults.results[i].publication_date);
        jobDate.innerHTML = 'Posting Date: ' + newDate.toLocaleDateString();
        resultsList.appendChild(jobDate);

        var categoryData = jobResults.results[i].categories[0].name;
        jobCategory.innerHTML = 'Job Category: ' + categoryData;
        resultsList.appendChild(jobCategory);

        var levelData = jobResults.results[i].levels[0].name;
        jobLevel.innerHTML = 'Level: ' + levelData;
        resultsList.appendChild(jobLevel);

        var descriptionData = jobResults.results[i].contents;
        jobDescription.innerHTML = 'Job Description: ' + descriptionData;
        jobDescription.setAttribute("hidden", true);
        resultsList.appendChild(jobDescription);

        var shortDescriptionData = jobResults.results[i].contents;
        shortDescription.innerHTML = 'Job Description: ' + shortDescriptionData.substring(0, 200);
        resultsList.appendChild(shortDescription);

        var lessResult = document.createElement('a');
        lessResult.setAttribute('id', "toggleButton" + i);
        lessResult.innerText = 'Show more ...';
        resultsList.appendChild(lessResult);

        //toggle between no display and display block. If my display is block, make it none; if it's none, make it block
        lessResult.onclick = function () {
            if (window.getComputedStyle(shortDescription).display === 'none') {
                shortDescription.style.display = 'block';
                jobDescription.style.display = 'none';
                lessResult.innerText = "Show more ...";
            } else {
                shortDescription.style.display = 'none';
                jobDescription.style.display = 'block';
                lessResult.innerText = "Show less ...";
            }
        };

        //Added border for results and append new div to the job-cards div
        resultsList.classList.add('card', 'has-background-warning-dark', 'border');
        jobsContainerEl.appendChild(resultsList);
    }
}

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
//         jobLevelEl.textContent = jobs.results[1].levels[i].name;
//         // Creates a <p> for job location
//         var jobLocationEl = document.createElement('p');
//         jobLocationEl.textContent = jobs.results[1].locations[i].name;
//         // Creates a <p> for job description
//         var jobDescriptionEl = document.createElement ('p');
//         jobDescriptionEl.textContent = jobs.results[1].contents;

//         jobsResultBody.append(jobTitleEl, companyNameEl, jobLevelEl, jobLocationEl, jobDescriptionEl);

//         jobsContainerEl.append(jobsCard)

//     }

// }

// local storage

// fetch second API (shibe)
function getShibe(event) {
    console.log("getting shibe!")
    if(event){
        event.preventDefault()
        event.stopPropogation()
    }

    var shibesUrl = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true'

    fetch(shibesUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            // console.log
            console.log("shibe-fetch", data)
            // displayShibe(data[0])
            document.getElementById("my-image").src = data[0];

        })
        // return getShibe()
}

// function displayShibe(data) {
//     console.log("displaying shibe")
//     console.log(data)
//     var print = new XMLHttpRequest();
//     print.onclick = function(event) {
//         console.log(event)
//         if (true) {
//             var data = JSON.parse(this.responseText);
//             // data.results[0].picture.large;
//         }
//         print.open("GET", getShibe());
//         return getShibe();
//     }
// }

// event listener
searchFormEl.addEventListener('submit', formSubmitHandler);
document.addEventListener('onload', getShibe)
