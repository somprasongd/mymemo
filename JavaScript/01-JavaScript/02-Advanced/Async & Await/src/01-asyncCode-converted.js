const fetch = require('node-fetch');

async function showGitHubUser(handle){
    const url = `https://api.github.com/users/${handle}`;
    // await pause promise until settled
    const response = await fetch(url);
    const user = await response.json();
    console.log(user.name);
    console.log(user.location);
}

showGitHubUser('somprasongd');