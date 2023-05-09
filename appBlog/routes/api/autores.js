const router = require('express').Router();

const { getAll, getAutorById, create, update, deleteById } = require('../../models/autores.models');

//GET(RECUPERA A TODOS LOS AUTORES)/api/autores
router.get('/', async (req, res) => {
    try {
        const [result] = await getAll();
        res.json(result);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//GET (RECUPERA UN AUTOR A PARTIR DE SU ID)/api/autores/id_autor
router.get('/:id_autor', async (req, res) => {
    const { id_autor } = req.params;
    try {
        const [result] = await getAutorById(id_autor);
        if (result.length === 0){
            return res.json({ Ups: 'No tenemos autor con ese ID' });
        }
        res.json(result[0]);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//POST(CREA UN AUTOR)/api/autores
router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [autor] = await getAutorById(result.insertId);
        res.json(autor[0]);
        
    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//PUT(ACTUALIZA UN AUTOR)/api/autores
router.put('/:id_autor', async (req, res) => {
    const { id_autor } = req.params;
    try {
        const [result] = await update(id_autor, req.body);
        const [autor] = await getAutorById(id_autor);
        res.json(autor[0]);

    } catch (error) {
        res.status(500).json({ Ups: error.message });
    }
});

//DELETE (ELIMINA UN AUTOR)/api/autores
router.delete('/:id_autor', async (req, res) => {
    const { id_autor } = req.params;
    try {
        const [autor] = await getAutorById([id_autor]);
        const [result] = await deleteById([id_autor]);
        res.json(autor[0]);
        
    } catch (error) {
        res.status(418).json({ Ups: error.message });
    }
});

module.exports = router;