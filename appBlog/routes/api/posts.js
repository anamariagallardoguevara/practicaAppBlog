const router = require('express').Router();

const { getAll, getPostById, create, update, deleteById, getPostByAutor } = require('../../models/posts.model');
const { getAutorById } = require('../../models/autores.models');


//1) GET(RECUPERA TODOS LOS POST CON SU AUTOR)/api/posts
router.get('/', async (req, res) => {
    try {
        const [posts] = await getAll();
        for(let post of posts){
            const [autor] = await getAutorById(post.pk_id_autor);
            post.autor = autor[0];
        }
        res.json(posts);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//GET(RECUPERA A LOS POST DE UN AUTOR)/api/posts/autor/id
router.get('/autor/:id_autor', async (req, res) => {
    const { id_autor } = req.params;
    try {
        const[autor] = await getAutorById(id_autor);
        const[posts] = await getPostByAutor(id_autor);
        console.log(posts);
        for(let post of posts){
            post.autor = autor[0];
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ Ups: error.message });    
    }
});

//GET (RECUPERA UN POST A PARTIR DE SU ID)/api/autores/id_post
router.get('/:id_post', async (req, res) => {
    const { id_post } = req.params;
    try {
        const [result] = await getPostById(id_post);
        if(result.length === 0){
            return res.json({ Ups: 'No tenemos un post con ese ID' })
        }
            const [autor] = await getAutorById(result[0].pk_id_autor);
            result[0].autor = autor[0];
        res.json(result[0]);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//POST(CREA UN POST)/api/posts
router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [noticia] = await getPostById(result.insertId);
        res.json(noticia[0]);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//PUT(ACTUALIZA UN POST)/api/posts
router.put('/:id_post', async (req, res) => {
    const { id_post } = req.params;
    try {
        const [result] = await update(id_post, req.body);
        const [noticia] = await getPostById(id_post);
        res.json(noticia[0]);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//DELETE (ELIMINA UN POST)/api/posts
router.delete('/:id_post', async (req, res) => {
    const { id_post } = req.params;
    try {
        const [noticia] = await getPostById([id_post]);
        const [result] = await deleteById([id_post]);
        res.json(noticia[0]);
        
    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

module.exports = router;