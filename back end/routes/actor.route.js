const express = require('express');
const validate = require('../middlewares/validate.mdw');
const schema = require("../schemas/actors.json")
const actorModel = require('../models/actor.model');

const router = express.Router();
const db = require('../utils/db');

router.get('/', async function(req, res) {
    const rows = await actorModel.findAll();
    res.json(rows);
});

router.get('/:id', async function(req, res) {
    const id = +req.params.id || 0;

    const actor = await actorModel.findById(id);

    if(actor === null) {
        return res.status(204).end();
    }
    res.json(actor);
});


router.post('/',validate(schema), async function(req, res) {
    const actor = req.body;
    const result = await actorModel.add(actor);
    actor.actor_id = result[0];
    res.status(201).json(actor);
});

router.delete('/:id',async function(req, res) {
    const id = +req.params.id || 0;

    if(id === 0) {
        return res.json({
            message: "No Actor Deleted"
        });
    }

    const affected_rows = await actorModel.del(id);
    if(affected_rows === 0) {
        return res.json({
            message: "No Actor Deleted"
        });
    }
    res.json({
        message: "Actor Deleted"
    });
});

router.patch('/', validate(schema), async function(req, res) {
    const actor = req.body;

    const id = actor.actor_id;
    delete actor.actor_id;

    const affected_rows = await actorModel.patch(id, actor);
    if(affected_rows === 0) {
        return res.status(304).end();
    }
    res.json(actor);
});

module.exports = router;