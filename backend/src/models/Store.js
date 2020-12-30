const {Model, DataTypes} = require('sequelize');

class Store extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            cnpj: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Store;