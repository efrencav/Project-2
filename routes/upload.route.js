// module.exports = function(app){
// 	const upload = require("../config/upload.config.js");
// 	const fileWorker = require("../controllers/upload.controller.js");
	
// 	app.post("/shop/add-product", upload.single("imageUrl"), fileWorker.upload);
// };

const multer = require("multer");
const multerConf = {
	storage : multer.disk.Storage({
		destination : function(req, file, next){
			next(null, "./public/uploads");
		},
		filename : function(req, file, next){
			next(null,file.fieldname + "-" + Date.now() + "." + ext);
		}
	}),
	fileFilter: function(req, file, next){
		if(!file){
			next();
		}
		const image = file.mimetype.startsWith("image/");
		if(image){
			next(null,true);
		}else{
			next({message:"File type not supported"}, false);
		}
	}
};

app.get("/shop/add-product", function(req, res){
	res.render("shop/add-product", {title: "Upload a product"});
});

app.post("/upload", multer(multerConf).single("imageUrl"), function(req, res){
	if(req.file){
		console.log(req.file);
		req.body.imageUrl = req.file.filename;
	}
	const upload = new uploadSchema(req.body).save();
	res.redirect("back");
});