const controllers = require('../model/controllers.js');
const phong = new controllers();
const Router=[
    { url: "/",
        method: "get",  
        handle: phong.home
    },
    {
        url : "/about",
        method: "get",
        handle: phong.about
    },
    {
        url : "/hihi",
        method: "get",
        handle: phong.hihi
    }
]

module.exports = Router;