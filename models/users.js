export default (sequelize, DataTypes)=>{
    const Users = sequelize.define('Users',{
        name:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(255),
            allowNull:false
        }
    },{tableName:'Users'})

    Users.associate  = (models) =>{
        // user has many comments in a post
        Users.hasMany(models.Comments,{
            foreignKey:"UserId",
            onDelete:"cascade"
        })
        // user has many posts
        // user has many replies in a comment
    }

    return Users
}