const db = require('../utils/db');

function findAll() {
    return db('customer');
}

async function findById(id) {
    const rows = await db('customer').where('customer_id', id);
    
    if(rows.lenght === 0) {
        return  null;
    }
    return rows[0];
}

function add(customer) {
    return db('customer').insert(customer);
}

function del(id) {
    return db('customer').where('customer_id', id).del();
}

function patch(id, customerWithoutId) {
    return db('customer').where('customer_id', id).update(customerWithoutId);
}

module.exports = {
    findAll,
    findById,
    add,
    del,
    patch
}