/* Includes: */
var http = require('http');
var fs = require('fs');
var url = require('url');

function calcPage(res) {
    fs.readFile('jsCalc.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
    /*
    res.write("Calc");
    res.end();
    */
}

function computePage(adr, res) {
    var q = url.parse(adr, true);

    res.write("< !DOCTYPE html >\n");
    res.write("    <html>");
    res.write("        <head>");
    res.write("            <title>" + q.search + "</title>\n");
    res.write("        </head>\n");
    res.write("        <body>\n");
    
    var X = q.query.x * 1, Y = q.query.y * 1, Y;
    switch (q.query.op) {
        case "plus": Z = X + Y; break;
        case "minus": Z = X - Y; break;
        case "times": Z = X * Y; break;
        case "div": Z = X / Y; break;
    }
    var expr = X + " " + q.query.op + " " + Y + " = " + Z;
    
    res.write("            <h1>" + expr + "</h1>\n");
    res.write("        </body>\n");
    res.write("    </html>");
    res.end();
}

/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
   // res.write(req.url);
    console.log("Serving " + req.url);
    var p = url.parse(req.url, true);

    if (req.url == "/") {
        res.write("< !DOCTYPE html >\n");
        res.write("    <html>");
        res.write("        <head>");
        res.write("            <title>" + req.url + "</title>\n");
        res.write("        </head>\n");
        res.write("        <body>\n");
        res.write("            <h1>" + req.url + "</h1>\n");
        res.write("            <p>My first paragraph.</p>\n");
        res.write("        </body>\n");
        res.write("    </html>");
        res.end();
    }
    else if (req.url == "/calc") {
        calcPage(res);

    }
    else if (p.pathname == "/compute") {
        computePage(req.url, res);
    }
    else {
        res.write("FEEEEL");
        res.end();
    }
}).listen(8080);