var fs = require("fs");
var path = require("path");
var beautifyHtml = require('js-beautify').html;
var options = require('./config.json')

const visitor=(p)=>{
	if(!fs.existsSync(p)){
		console.log(`${p} not exist!`)
		return
	}
	if(!fs.statSync(p).isDirectory()){
		console.log(`${p} not directory!`)
		return
	}
	var list = fs.readdirSync(p);
	list.forEach(item=>{
		if(fs.statSync(path.join(p,item)).isDirectory()){
			visitor(path.join(p,item));
			return
		}
		if(!/\.html$/.test(item)){
			return
		}
		formatter(path.join(p,item))
	});
}
const formatter=(p)=>{
	fs.readFile(p,{encoding:'utf-8'},(err,data)=>{
		fs.writeFile(p,beautifyHtml(data,options),{encoding:'utf-8'},()=>{
			console.log('success formatter html :'+p);
		})
	});
}

visitor(path.join(__dirname,'../dist'));
