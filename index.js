const fs=require("fs");
const http=require("http");
const url=require('url');
const { Console } = require("console");
const replaceTemplate=require('./starter/modlues.js/replaceTemplates.js');
// SERVER



const tempOverview=fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,"utf-8");
const tempCard=fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,"utf-8");
const tempProduct=fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,"utf-8");
const data=fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,"utf-8");

const dataObj=JSON.parse(data);

const server=http.createServer((req,res)=>{

    const {query,pathname}=url.parse(req.url,true);




    // OVERVIEW
    if (pathname==="/"|| pathname==="/overview"){
        res.writeHead(200,{"Content-Type":"text/html"});
        const cardsHtml=dataObj.map(ele=>replaceTemplate(tempCard,ele)).join('');
        // console.log(cardsHtml);
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    }

    // PRODUCT
    else if ( pathname==="/product"){
        console.log(query)
        res.writeHead(200,{"Content-Type":"text/html"});
        // now query.id has ids of different elements.......
        const product=dataObj[query.id];
        // then call the function "replaceTemplate"
        const output=replaceTemplate(tempProduct,product)
        res.end(output);
    }

    // API
    else if (pathname==="/api"){
        
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(data);
        
    }

    // NOT FOUND
    else{
        // res.writeHead(404);// this will be set in res.statusCode...u can check in, inspect element => console
        // you can also use writeHead like this==>
        res.writeHead(404,{
            "Content-Type":"text/html",
            "my-own-header":"hello world"
        })

        res.end('<h1>Page not Found</h1>');
    }
});


server.listen(8000,"127.0.0.1",()=>{
    
    console.log("Connected to port 8000");
})
