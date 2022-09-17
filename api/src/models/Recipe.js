const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'recipe',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			summary: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
			healthScore: {
				type: DataTypes.FLOAT(1),
				allowNull: false,
				validate: {
					min: 0,
					max: 100,
				},
			},
			image: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: false,
		}
	);
};
