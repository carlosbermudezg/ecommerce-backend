const User = require('../models/User');
const sequelize = require('../utils/connection');

require('../models/User')
require('../models/Category')
require('../models/Product')
require('../models/ProductImg')
require('../models/Cart')
require('../models/Purchase')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Gabriel",
            lastName: "Martinez",
            email: "martinez1234@test.com",
            password: "test",
            phone: "+3532438269"
          })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();