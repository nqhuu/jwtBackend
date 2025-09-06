'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { foreignKey: "customerId" })
      Project.belongsToMany(models.User, {
        through: "Project_User",
        foreignKey: "projectId", // đây là cột trong Group_Role trỏ về id của bảng hiện tại - Project.id
        otherKey: "userId", //đây là cột trong Group_Role trỏ về id của bảng đối diện - User.id
        constraints: true,
        /**
        * Sequelize sẽ tự động đặt foreignKey và otherKey thành khóa ngoại (FOREIGN KEY) trong bảng trung gian (Group_Role) nếu bạn để Sequelize tự generate bảng.
        * Sequelize cũng sẽ tự thêm các option ON DELETE và ON UPDATE mặc định là CASCADE nếu bạn không khai báo thủ công.
        **/
        // onDelete: "CASCADE", //Khi bảng A hoặc B bị xóa, Sequelize sẽ tự động xóa các bản ghi liên quan trong bảng trung gian.
        // onUpdate: "CASCADE" //Khi id của A hoặc B bị thay đổi, Sequelize sẽ tự động cập nhật các giá trị trong bảng trung gian.
      })
    }
  };
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.STRING,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};