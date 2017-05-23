const fetch = require('node-fetch');

// async function
async function showGitHubUser(handle){
    const url = `https://api.github.com/users/${handle}`;
    // await pause promise until settled
    const response = await fetch(url);
    const body = await response.json();

    if(response.status !== 200){
        throw new Error(body.message);
    }
    return body;
}
// call an Asynchronous Function in a Promise Chain
showGitHubUser('idnotexist')
    .then(user => {
        console.log(user);
    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
    });