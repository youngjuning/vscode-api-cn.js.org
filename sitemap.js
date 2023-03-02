const fs = require("fs");
const recursive = require("recursive-readdir");
const execSh = require("exec-sh");

(async () =>{
	if (!fs.existsSync("./docs")) {
		return;
	}
	const files = await recursive("./docs");
	const urls = files.filter(file => file.endsWith('.html')).map(file => {
		return file.replace('docs/', 'https://vscode-api-cn.js.org/')
	})
	fs.writeFileSync("./docs/urls.txt", urls.join("\n"));
	execSh("npx sitemap < ./docs/urls.txt > ./docs/sitemap.xml");
})()
