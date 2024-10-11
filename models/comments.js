export default (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        'Comments',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            comment: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            PostId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },{
            tableName: 'Comments'
        }
    );
    Comments.associate = (models)=>{
        Comments.belongsTo(models.Users,{
            foreignKey: 'UserId',
            as: 'user'
        })
        Comments.belongsTo(models.Posts,{
            foreignKey:'PostId',
            as: 'post'
        })
    }
    return Comments
}