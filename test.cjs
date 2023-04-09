const https = require("https");
const url = "https://github.com/dprint/dprint/releases/download/0.35.3/dprint-x86_64-unknown-linux-gnu.zip";
const agent = new https.Agent({ keepAlive: JSON.parse(process.argv[2]) })
https.get(url, { method: "HEAD", agent,  }, () => console.log("!!! request complete"));
