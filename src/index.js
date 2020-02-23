const http = require("http");
const url = require("url");

http.createServer(function (req, res) {

    let param = url.parse(req.url, true).query;
    const s = param.s;
    
    let redir;
    if (!s) redir = "https://www.google.com/";
    else if (s.match(/^[\x00-\x7F]*$/)) redir = `https://www.google.com/search?q=${s}&lr=lang_en`;
    else redir = `https://www.google.com/search?q=${encodeURIComponent(s)}&lr=lang_zh-TW`;
    
    res.writeHead(302, { "Location": redir });
    res.end();

}).listen(process.env.PORT || 8080);