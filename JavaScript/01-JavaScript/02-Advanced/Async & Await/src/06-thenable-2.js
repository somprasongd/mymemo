const Bluebird = require('bluebird');
async function main() {
    console.log('Start...');
    await Bluebird.delay(2000); // delay 2 sec
    console.log('Done.');
}

main();