export default (Sequelize, DataTypes) =>{
    const Likes = Sequelize.define('Likes',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PostId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    Likes.associate = (models) =>{
        Likes.belongsTo(models.Users,{
            foreignKey: 'UserId',
            as: 'user'
        })
        Likes.belongsTo(models.Posts,{
            foreignKey: 'PostId',
            as: 'post'
        })
    }
    return Likes
}