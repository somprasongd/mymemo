const fetch = require('node-fetch');

// async function
async function fetchFromGitHub(endpoint){
    const url = `https://api.github.com${endpoint}`;
    // await pause promise until settled
    const response = await fetch(url);
    return await response.json();
}

async function showUserAndRepos(handle) {
    const [user, repos] = await Promise.all([
        fetchFromGitHub(`/users/${handle}`),
        fetchFromGitHub(`/users/${handle}/repos`)
    ]);

    console.log(user.name);
    console.log(`${repos.length} repos`);
}

showUserAndRepos('somprasongd');

/* Wait 3 sec
Somprasong Damyos
5 repos
*/