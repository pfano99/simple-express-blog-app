const express = require('express');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

require('dotenv').config()
app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({'extended':false}))

const sequelize = new Sequelize({
	host: process.env.HOST,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	dialect: process.env.DIALECT
})

// connecting to the database
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

global.post = sequelize.define('Post', {
	title:{
		type: DataTypes.STRING,
	},
	body: {
		type: DataTypes.TEXT
	},
	date_created: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}, { tableName: 'Post', timestamps: false }) 


// creating the table if it not already created/exist
// sequelize.sync().then(()=>{
// 	console.log("table successfully created");
// }).catch((error)=>{
// 	console.log(error)
// })


// getting routers

const posts_router = require("./router/post/posts") 

app.get('/', (req, res)=>{

	post.findAll(
		{ order: [ ['date_created', 'DESC'] ]}
	).then((posts)=>{
		console.log(posts)
		res.render('index', { posts })
	}).catch((error)=>{
		throw error;
	})

});

app.use('/post', posts_router)

app.listen(3000)




