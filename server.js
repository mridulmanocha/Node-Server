 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');
 const port = process.env.PORT || 8000;

 var app = express();

 app.set('view engine' , 'hbs');

 hbs.registerPartials(__dirname + '/views/partials');

 hbs.registerHelper('currentYear' , () => {return new Date().getFullYear()});
 hbs.registerHelper('upperCaseit' , (text) => {return text });

 app.use((req, res, next) => {
 	var now = new Date().toString();
 	var log = `${now} : ${req.method} : ${req.url}` ;
 	console.log(log);
 	fs.appendFile('server.log' , log + '\n' , (error) => {
 		if(error){
 			console.log('Unable to log.')
 		}
 	});
 	next();
 })

 // app.use((req, res, next) => {
 // 	res.render('maintenance.hbs');
 // });

 app.use(express.static( __dirname + '/public_html'));

 app.get('/', (req,res) => {

 	

 	res.render('home.hbs',{
 		name : 'Mridul',
 		age : '21',
 	currentYear : new Date().getFullYear()});

 	// res.send('BILLU KA LADKI BILLI');
 });

app.get('/about', (req,res) => {

 	res.render('about.hbs' ,{

 		pageTitle : 'ABOUT',
 		
 	});
 
 });

app.get('/projects', (req,res) => {

 	res.render('projects.hbs');
 
 });

 app.listen(port, () => {
 	console.log(`server is up and running on port ${port}`);
 });