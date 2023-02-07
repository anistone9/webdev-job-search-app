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

// console.log

// function to display results

// event listener

// local storage

// fetch second API (shibe)

// console.log 

searchFormEl.addEventListener('submit', formSubmitHandler);