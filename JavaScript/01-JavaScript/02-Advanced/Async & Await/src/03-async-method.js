const fetch = require('node-fetch');

class GitHubApiClient {
    async fetchUser(handle){
        const url = `https://api.github.com/users/${handle}`;
        const response = await fetch(url);
        return await response.json();    
    }
}

// การเรียกใช้งาน async function ด้วย arrow fucntion
(async () => {
    const client = new GitHubApiClient();
    const user = await client.fetchUser('somprasongd');
    console.log(user.name);    
    console.log(user.location);
})();