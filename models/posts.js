export default (sequelize, DataTypes) => {
    const Posts = sequelize.define(
        "Posts",{
            post: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },{
            tableName: 'Posts'
        }
    );
    Posts.associate = (models) => {
        Posts.belongsTo(models.Users,{
            foreignKey: 'UserId',
            as: 'user'
        })
        Posts.hasMany(models.Comments,{
            foreignKey: 'PostId',
            as: 'comments'
        })
    }
    return Posts
}