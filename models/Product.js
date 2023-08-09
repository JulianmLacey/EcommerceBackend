// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
	{
		//id; INTEGER; doesn't allow null values; set as primary key; uses auto increment
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		//product_name; STRING; Doesn't allow null values
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		//price; DECIMAL; Doesn't allow null values; Validates that the value is a decimal
		price: {
			type: DataTypes.DECIMAL(8, 2),
			allowNull: false,
			validate: {
				isDecimal: true,
			},
		},
		//stock; INTEGER Doesn't allow null values; Set a default value of 10; Validates that the value is numeric
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
			validate: {
				isNumeric: true,
			},
		},
		//Category_id; INTEGER; References the category model's id
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "category",
				key: "id",
				unique: false,
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product",
	}
);

module.exports = Product;
