const {Article} = require('../models/models')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = `${uuid.v4()}${ext}`
        cb(null, filename)
    }
})
const upload = multer({storage: storage})

class ArticleController {
    async addArticle(req, res) {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                console.log(err)
            } else {
                const {author, text, title} = req.body;
                const ext = path.extname(req.file.originalname);
                const imageFilePath = req.file.path;
                const article = await Article.create({
                    author: author,
                    text: text,
                    image: imageFilePath,
                    title: title
                });
                return res.status(200).end();
            }
        })
    }

    async getArticles(req, res) {
        const articles = await Article.findAll();
        const transformedArticles = articles.map(article => {
            const imageUrl = `http://localhost:3000/${article.image.replace(/\\/g, '/')}`
            return {...article.toJSON(), imageUrl};
        });
        return res.status(200).json(transformedArticles);
    }
}


module.exports = new ArticleController()