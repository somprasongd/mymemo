const fetch = require('node-fetch');

// async function
async function fetchFromGitHub(endpoint){
    const url = `https://api.github.com${endpoint}`;
    // await pause promise until settled
    const response = await fetch(url);
    return await response.json();
}

async function showUserAndRepos(handle) {
    console.time('concurrently');
    const userPromise = fetchFromGitHub(`/users/${handle}`);
    const reposPromise = fetchFromGitHub(`/users/${handle}/repos`);

    const user = await userPromise;
    const repos = await reposPromise;

    console.log(user.name);
    console.log(`${repos.length} repos`);
    console.timeEnd('concurrently');
}

showUserAndRepos('somprasongd');

/*
Somprasong Damyos
5 repos
concurrently: 1252.951ms
*/