const StoreLocation = require('../models/StoreLocation')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
    async index(req, res){

        const lat = parseFloat(req.params.lat);
        const lon = parseFloat(req.params.lon);
        console.log(-0.1+lat)
        const storeLocations = await StoreLocation.findAll(
            {
            where: {
                latitude: {
                    [Op.gte]: -0.1+lat,
                    [Op.lte]: lat+0.2
                },
                longitude: {
                    [Op.lte]: lon+0.1,
                    [Op.gte]: -0.2+lon
                },
            }
        }
        )
        return res.json(storeLocations);
    },

    async store(req,res){
        const { name, rua, store_id, numero, cidade, estado, complemento, email, telefone, website, latitude, longitude} = req.body;
        
        const storeLocation = await StoreLocation.create({ name, rua, store_id, numero, cidade, estado, complemento, email, telefone, website, latitude, longitude })

        return res.json(storeLocation);
    }
}