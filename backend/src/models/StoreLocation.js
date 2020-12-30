const {Model, DataTypes} = require('sequelize');

class StoreLocation extends Model {
    static init(sequelize) {
        super.init({
            store_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            rua: DataTypes.STRING,
            numero: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            complemento: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            website: DataTypes.STRING,
            latitude: DataTypes.DOUBLE,
            longitude: DataTypes.DOUBLE,
        }, {
            sequelize
        })
    }
}

module.exports = StoreLocation;