'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  curso.init({
    nombrecurso: DataTypes.STRING,
    sigla: DataTypes.STRING,
    promediomin: DataTypes.FLOAT,
    promediometa: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'curso',
  });
  return curso;
};