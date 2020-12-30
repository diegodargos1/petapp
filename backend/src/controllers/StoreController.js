const Store = require('../models/Store')

module.exports = {
    async store(req,res){
        const { name, cnpj, user_id } = req.body;
        
        const store = await Store.create({ name, cnpj, user_id })

        return res.json(store);
    }
}