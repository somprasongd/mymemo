const fetch = require('node-fetch');

function showGitHubUser(handle){
    const url = `https://api.github.com/users/${handle}`;
    fetch(url)
    .then(response => response.json())
    .then(user => {
        console.log(user.name);
        console.log(user.location);
    });
}

showGitHubUser('somprasongd');