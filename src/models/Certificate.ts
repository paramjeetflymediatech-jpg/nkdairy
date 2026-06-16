import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/db';

export class Certificate extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public image!: string;
}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Certificate',
    tableName: 'certificates',
    timestamps: true,
  }
);
