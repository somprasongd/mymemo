const os = require('os');

console.log(`System informations
Endianness: ${os.endianness()}
Type: ${os.type()}
Platform: ${os.platform()}
Arch: ${os.arch()}
OS Version: ${os.release()}
Home Directory: ${os.homedir()}
Total Memory: ${os.totalmem()} bytes
Free Memory: ${os.freemem()} bytes
Hostname: ${os.hostname()}
Uptime: ${os.uptime()}`);