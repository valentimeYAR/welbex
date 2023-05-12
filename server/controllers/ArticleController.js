const {Article} = require('../models/models')
const {User} = require('../models/models')
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
                try {
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
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    async getArticles(req, res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 20;
        try {
            const totalCount = await Article.count();
            const totalPages = Math.ceil(totalCount / perPage);

            const articles = await Article.findAll({
                offset: (page - 1) * perPage,
                limit: perPage,
                include: {model: User, as: 'user', attributes: ['login']}
            })
            const transformedArticles = articles.map(article => {
                const imageUrl = `http://localhost:3000/${article.image.replace(/\\/g, '/')}`
                return {...article.toJSON(), imageUrl};
            });
            res.json({
                transformedArticles,
                currentPage: page,
                totalPages,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getArticle(req, res) {
        try {
            const {id} = req.params;

            const article = await Article.findOne({
                where: {id: id},
                include: {model: User, as: 'user', attributes: ['login']}
            })
            const imageUrl = `http://localhost:3000/${article.image.replace(/\\/g, '/')}`;
            const date = new Date(article.createdAt)
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            const formattedDate = year + "-" + month + "-" + day;
            const transformedArticle = {
                id: article.id,
                title: article.title,
                text: article.text,
                imageUrl: imageUrl,
                createdAt: formattedDate,
                user: {
                    login: article.user.login
                }
            };
            return res.json(transformedArticle);
        } catch (e) {
            console.log(e)
        }
    }

    async editArticle(req, res) {
        try {
            const {id} = req.params
            const {title, text} = req.body
            const article = await Article.findOne({
                where: {id: id},
            })
            article.title = title
            article.text = text
            await article.save()
            return res.status(200).json({message: 'Article successfully updated'})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteArticle(req, res) {
        const {id} = req.params
        const article = await Article.findByPk(id)
        await article.destroy()
        return res.status(200).json({message: 'Article successfully deleted'})
    }
}


module.exports = new ArticleController()