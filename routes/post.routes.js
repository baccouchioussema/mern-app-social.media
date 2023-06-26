const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
// const upload = multer(); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../client/public/uploads/posts/`);
    },
    filename: function (req, file, cb) {
        console.log("multer reqbody : " , req.body)
       let fileName = req.body.posterId + Date.now() ;
      cb(null, fileName + '.jpg');
    },
  });
  
  const upload = multer({ storage });

router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id' , postController.likePost);
router.patch('/unlike-post/:id' , postController.unlikePost);


//comments
router.patch('/comment-post/:id' , postController.commentPost);
router.patch('/edit-comment-post/:id' , postController.editCommentPost);
router.patch('/delete-comment-post/:id' , postController.deleteCommentPost);




module.exports = router; 