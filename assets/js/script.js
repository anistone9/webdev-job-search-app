// function for search button

// function to fetch first API (job search)
function getJobSearch(jobs) {
    var jobsUrl = 'https://arbeitnow.com/api/job-board-api';

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

// console.log 