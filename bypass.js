const { fetchKey } = require('./platorelayBypass.js');

async function main() {
    const targetUrl = process.argv[2];
    if (!targetUrl) {
        console.error('Usage: node bypass.js <url>');
        process.exit(1);
    }
    try {
        const res = await fetchKey(targetUrl);
        if (res && res.key && res.key !== 'KEY_NOT_FOUND') {
            console.log(`[+] SUCCESS! Key: ${res.key}`);
        } else {
            console.error('[-] Key not found or expired');
            process.exit(1);
        }
    } catch (err) {
        console.error(`[-] Error: ${err.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { fetchKey };
