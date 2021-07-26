const db = require('../utils/db');

function findAll() {
    return db('actor');
}

async function findById(id) {
    const rows = await db('actor').where('actor_id', id);
    
    if(rows.lenght === 0) {
        return  null;
    }
    return rows[0];
}

function add(actor) {
    return db('actor').insert(actor);
}

function del(id) {
    return db('actor').where('actor_id', id).del();
}

function patch(id, actorWithoutId) {
    return db('actor').where('actor_id', id).update(actorWithoutId);
}

module.exports = {
    findAll,
    findById,
    add,
    del,
    patch
}