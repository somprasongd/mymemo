const fetch = require('node-fetch');

// async function
async function fetchGitHubUser(handle){
    const url = `https://api.github.com/users/${handle}`;
    // await pause promise until settled
    const response = await fetch(url);
    const body = await response.json();

    if(response.status !== 200){
        throw new Error(body.message);
    }
    return body;
}

async function showGitHubUser(handle) {
    try{
        const user = await fetchGitHubUser(handle);
        console.log(user.name);    
        console.log(user.location);
    }catch(err){
        console.log(`Error: ${err.message}`);
    }
}

showGitHubUser('idnotexist'); // Error: Not Found