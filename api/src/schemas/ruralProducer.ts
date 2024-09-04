import { DataTypes } from "sequelize";
import connection from "@/configs/databaseConnection";

const RuralProducer = connection.define(
  "RuralProducer",
  {
    CPF: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [11, 11],
      },
    },
    CNPJ: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [14, 14],
      },
    },
    producer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    farm_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_area_cultivated: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_area_forest: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cultures: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: "RuralProducer",
    tableName: "rural_producer",
    indexes: [
      {
        unique: false,
        fields: ["CPF", "CNPJ"],
      },
    ],
    validate: {
      cpfOrCnpj() {
        if (!this.CPF && !this.CNPJ) {
          throw new Error("CPF or CNPJ is required");
        }
        if (this.CPF && this.CNPJ) {
          throw new Error("CPF and CNPJ are mutually exclusive");
        }
      },
    },
  }
);

export default RuralProducer;
