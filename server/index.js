	const http = require('http');
	const url = require("url")
	const queryString = require("querystring")

	var saveJSON = "";


	http.createServer((req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("content-type","text/html;charset=UTF-8")
		if(req.method === 'GET'){
			let params = url.parse(req.url,true,true);
			res.write('当前搜索结果'+ params.query.search +'如下');
			res.end();
		}else{
			let datas = '';
			req.on('data',(data) => {
				datas += data;
			});
			req.on('end',() => {
				saveJSON = JSON.parse(datas.toString());
			})
			res.end("当前请求方式为post")
		}
		

	}).listen(3245,() => {
		console.log('服务器启动成功');
	});