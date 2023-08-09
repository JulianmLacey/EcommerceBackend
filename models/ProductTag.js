const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
	{
		//id; INTEGER; doesn't allow null values; set as primary key; uses auto increment
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		//product_id; INTEGER; References the product model's id
		product_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "product",
				key: "id",
			},
		},
		//tag_id; INTEGER; References the tag model's id
		tag_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "tag",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product_tag",
	}
);

module.exports = ProductTag;
