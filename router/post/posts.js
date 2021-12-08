const { Router } = require('express');
const express = require('express');
const { Op } = require('sequelize')


const router = express.Router()


router.get('/', (req, res)=>{
	res.send("working");
});


router.get('/add', (req, res)=>{
	res.render('posts/add');
});


router.post('/add', (req, res)=>{
	console.log(req.body.title)
	global.post.create( { title: req.body.title, body:req.body.body } ).then( ()=>{
		res.redirect('/');
	} ).catch( (err)=>{
		throw err;
	} )
});

router.get('/edit/:post_id', (req, res)=>{
	global.post.findByPk(req.params.post_id).then((result)=>{

		res.render("posts/update", { post: {id: result.id, title:result.title, body: result.body } })
		
	})
});


router.post('/edit/:post_id', (req, res)=>{
	global.post.findByPk(req.params.post_id).then((result)=>{
		result.title = req.body.title
		result.body = req.body.body
		result.save().then(()=>{
			res.redirect('/')
		}).catch((error)=>{
			throw error;
		})
	})
});


router.get('/delete/:post_id', (req, res)=>{
	global.post.findByPk(req.params.post_id).then((result)=>{
		result.destroy().then(()=>{
			res.redirect('/')
		}).catch((err)=>{
			throw err;
		})
	}).catch((err)=>{
		throw error;
	});
});


router.post('/search/', (req, res)=>{
	global.post.findAll().then((posts)=>{
		console.log("yep")
		res.redirect('/', { posts })
	}).catch((err)=>{
		throw err;
	})
})

module.exports = router;
