const dns = require('dns');

// get ip address from dns
// 1st param => dns
// 2nd param => callback function send error, ip address
dns.lookup('google.co.th', (err, address) => {
    console.log(`Google address: ${address}`)
});