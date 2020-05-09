require('dotenv').config();
const http = require("http");
const url = require("url");

const port = process.env.PORT || 8080;
const server = http.createServer(function (req, res) {

    let param = url.parse(req.url, true).query;
    const s = param.s;
    
    let redir;
    if (!s) { 
		redir = "https://www.google.com/";
	}
	else {
		const lang = s.match(/^[\x00-\x7F]*$/) ? "lang_en" : "lang_zh-TW";
		redir = `https://www.google.com/search?q=${encodeURIComponent(s)}&lr=${lang}`;
	}
    
    res.writeHead(302, { "Location": redir });
    res.end();
});

server.listen(process.env.PORT || 8080, () => {
	console.log(`Server running on port ${port}`);
});

