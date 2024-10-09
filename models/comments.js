export default (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        'Comments',{
            comment: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            user_id: {
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
    }
    return Comments
}