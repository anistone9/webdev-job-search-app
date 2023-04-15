var searchFormEl = document.getElementById('search-form');
var categoriesSelectEl = document.getElementById('categories');
var resultsContainerDivEl = document.getElementById('results-container');
var jobButtonsEl = document.getElementById('job-buttons');
var previousSearches = document.getElementById('previous-searches');
var searchCategory;

var apiKey1 = "&api_key=0baa9fe5f5bebece6a9a3c670885ad97f3625e18b3148bb62e59c4df39a2780a";

// function for event handler (search button) to retrieve user input
function formSubmitHandler(event) {
    event.preventDefault();

    //Check if a valid selection is made
    if (categoriesSelectEl.selectedIndex >= 0) {

        //Grab the search of the user and remove the leading and trailing white spaces from user input
        var selectedCategory = categoriesSelectEl.options[categoriesSelectEl.selectedIndex].text;
        searchCategory = selectedCategory;

        //If statement to check if user presses Search without typing anything or without 
        if (selectedCategory) {
            fetchJobCategory(selectedCategory);
            //Empty search box after running the initial search
            categoriesSelectEl.value = '';

            //clean up the results page when a new search is initiated
            resultsContainerDivEl.innerHTML = '';
        }
    }
}

// function to fetch API (job search)
function fetchJobCategory(selectedCategory) {
    var fetchUrl = `https://www.themuse.com/api/public/jobs?category=${selectedCategory}&page=1&descending=true` + apiKey1

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (jobsResults) {
                    displayResults(jobsResults);
                });
                //Result received but not ok alert
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        //No result received alert
        .catch(function (error) {
            alert('Unable to reach jobs url');
        })
}

// function to display results
function displayResults(jobResults) {
    //If no results are pulled from api, return (end the function and return to the line where it was called from)
    if (jobResults.length === 0) {
        return;
    }

    var titleEl = document.createElement('h2');
    titleEl.innerHTML = 'Search results: ' + searchCategory;
    resultsContainerDivEl.appendChild(titleEl);

    for (var i = 0; i < 10; i++) {
        //if statement to handle less than 10 results; skip empty results (within function use return, within 'for' loop use continue)
        if (jobResults.results[i] == null) {
            continue;
        }

        //Create a variable to hold single job result
        var jobResult = jobResults.results[i];
        createResultsDiv(jobResult, i);
    }
}

function createResultsDiv(jobResult, i) {
    //Create a new div for each result, in order to add a border and style the list
    var resultsList = document.createElement('div');

    var jobTitle = document.createElement('p');
    var jobCompany = document.createElement('p');
    var jobDate = document.createElement('p');
    var jobCategory = document.createElement('p');
    var jobLevel = document.createElement('p');
    var jobDescription = document.createElement('p');
    var truncatedDescription = document.createElement('p');

    var titleData = jobResult.name;
    jobTitle.innerHTML = 'Job Title: ' + titleData;
    jobTitle.classList.add('message-header', 'has-background-info', 'has-text-dark')

    var companyData = jobResult.company.name;
    jobCompany.innerHTML = 'Company: ' + companyData;
    jobCompany.classList.add('message-body', 'pb-2', 'pt-3', 'has-background-info-light', 'has-text-dark')

    var newDate = new Date(jobResult.publication_date);
    jobDate.innerHTML = 'Posting Date: ' + newDate.toLocaleDateString();
    jobDate.classList.add('message-body', 'py-2', 'has-background-info-light', 'has-text-dark')

    var categoryData = jobResult.categories[0].name;
    for (var j = 1; j < jobResult.categories.length; j++) {
        categoryData = categoryData + ', ' + jobResult.categories[j].name;
    }
    jobCategory.innerHTML = 'Job Category: ' + categoryData;
    jobCategory.classList.add('message-body', 'py-2', 'has-background-info-light', 'has-text-dark')

    var levelData = jobResult.levels[0].name;
    jobLevel.innerHTML = 'Level: ' + levelData;
    jobLevel.classList.add('message-body', 'py-2', 'has-background-info-light', 'has-text-dark')

    var descriptionData = jobResult.contents;
    jobDescription.innerHTML = 'Job Description: ' + descriptionData;
    jobDescription.setAttribute('id', "longDesc" + i);
    jobDescription.setAttribute("hidden", true);
    jobDescription.classList.add('message-body', 'py-2', 'has-background-info-light', 'has-text-dark')

    var shortDescriptionData = jobResult.contents;
    truncatedDescription.innerHTML = 'Job Description: ' + shortDescriptionData.substring(0, 200);
    truncatedDescription.setAttribute('id', "shortDesc" + i);
    truncatedDescription.classList.add('message-body', 'py-2', 'has-background-info-light', 'has-text-dark')

    var showMore = document.createElement('a');
    showMore.setAttribute('id', "toggleButton" + i);
    showMore.innerText = 'Show more ...';
    showMore.classList.add('message-body', 'py-2', 'has-text-dark')

    //toggle between no display and display block. If my display is block, make it none; if it's none, make it block
    //this function runs after the results are displayed, to show short description and allow the user to expand it if the Show more ...button is clicked
    showMore.onclick = function (event) {
        //Create a variable that contains the Show more... you clicked on 
        var toggleButton = event.target;
        var toggleIdentifier = toggleButton.id.substring(12);
        var longDescription = document.getElementById('longDesc' + toggleIdentifier);
        var shortDescription = document.getElementById('shortDesc' + toggleIdentifier);

        if (window.getComputedStyle(shortDescription).display === 'none') {
            shortDescription.style.display = 'block';
            longDescription.style.display = 'none';
            toggleButton.innerText = "Show more ...";
        } else {
            shortDescription.style.display = 'none';
            longDescription.style.display = 'block';
            toggleButton.innerText = "Show less ...";

            //Create a div to pull the data from the entire result card (the parent of the toggle button)
            var jobResultDiv = toggleButton.parentElement;
            storeSearch(jobResultDiv);
        }
    };

    resultsList.append(jobTitle, jobCompany, jobDate, jobCategory, jobLevel, jobDescription, truncatedDescription, showMore);

    //Add border for results and append new div to the job-cards div
    resultsList.classList.add('has-background-info-light', 'border', 'has-text-dark', 'my-3');
    resultsContainerDivEl.appendChild(resultsList);
}

//Button for the stored and displayed search item
function viewedResultButtonHandler(event) {
    //Clear results from right side of screen, when the stored-search button is clicked for a specific result
    resultsContainerDivEl.innerHTML = '';
    //Job title text, saved as the key in local storage
    var previouslyViewedResult = event.srcElement.innerText;
    retrieveSearch(previouslyViewedResult);
}

//Function to store any searches that the user clicks Show more ... on
function storeSearch(jobResultDiv) {
    //Create a variable that stores the job title that the user looked at (show more)
    var viewedTitle = jobResultDiv.children[0].innerText;
    //Create a variable that checks if that title already exists in local storage
    var titleExists = localStorage.getItem(viewedTitle);
    //if the title already exists, do nothing; if not, check to see if there are 5 title in storage, and if so, delete the 5th one; then add title to storage
    if (titleExists) {
        return;
    } else {
        if (localStorage.key(4)) {
            localStorage.removeItem(localStorage.key(4));
        }
        localStorage.setItem(viewedTitle, JSON.stringify(jobResultDiv.outerHTML));
        jobButtonsEl.innerHTML = '';
        previousSearches.innerHTML = 'Recently viewed';

        //Create a button for stored and displayed searches
        for (var i = 0; i < localStorage.length; i++) {
            var searchButton = document.createElement('a');
            searchButton.textContent = localStorage.key(i);
            searchButton.classList.add('btn');
            jobButtonsEl.appendChild(searchButton);
            jobButtonsEl.addEventListener('click', viewedResultButtonHandler);
        }
    }
}

function retrieveSearch(previouslyViewedResult) {
    var storedItem = localStorage.getItem(previouslyViewedResult);
    storedItem = JSON.parse(storedItem);

    var resultsList = document.createElement('div');
    resultsContainerDivEl.append(resultsList);
    resultsList.outerHTML = storedItem;

    var newToggle = resultsContainerDivEl.getElementsByTagName('a');
    newToggle[newToggle.length - 1].style.display = 'none';
}

// event listeners
searchFormEl.addEventListener('submit', formSubmitHandler);

//Empty local storage each time the page is refreshed, to avoid getting stuck due to full storage (and forgetting about it)
localStorage.clear();