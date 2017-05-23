const fetch = require('node-fetch');

// async function
async function showGitHubUser(handle){
    const url = `https://api.github.com/users/${handle}`;
    // await pause promise until settled
    const response = await fetch(url);
    return await response.json();
    
}
// call an Asynchronous Function in a Promise Chain
showGitHubUser('somprasongd')
    .then(user => {
        console.log(user.name);
        console.log(user.location);
    });


(async function() {
    const user = await showGitHubUser('somprasongd');
    console.log(user.name);
    console.log(user.location);
})();