import http from "node:http";
import url from "node:url";
import { readFile } from "fs";

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = getFilePath(pathname)
  readFile(`./pages/${filePath}.html`, "utf-8", (_, html) => {
    const status = filePath === "404" ? 404 : 200
    res.writeHead(status, { "Content-Type": "text/html" });
    res.write(html)
    res.end()
  })
});

/**
 * @param {string} pathname 
 * @returns {string}
 */
function getFilePath(pathname) {
  if (pathname == "/") return'index';
  else if (pathname == "/about" || pathname == "/contact-me") return pathname.slice(1)
  else return'404'
}

server.listen(8080);