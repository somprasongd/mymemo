const fetch = require('node-fetch');

// async function
async function fetchFromGitHub(endpoint){
    const url = `https://api.github.com${endpoint}`;
    // await pause promise until settled
    const response = await fetch(url);
    return await response.json();
}

async function showUserAndRepos(handle) {
    console.time('sequeantially');
    const user = await fetchFromGitHub(`/users/${handle}`);
    const repos = await fetchFromGitHub(`/users/${handle}/repos`);

    console.log(user.name);
    console.log(`${repos.length} repos`);
    console.timeEnd('sequeantially');
}

showUserAndRepos('somprasongd');

/*
Somprasong Damyos
5 repos
sequeantially: 2053.222ms
*/