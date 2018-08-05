let express = require('express');
let app = express();
  
  function bindMiddlewares (app, path, routes){
    let router = express.Router();
    routes.forEach(function(route){   
      let middlewares =[]; 
      // middlewares.push(accessControl(route.role,route.require));
      // middlewares.push(dataValidator());
      // if(route.methodUpload&&route.fieldName){
      //   middlewares.push(upload[route.methodUpload](route.fieldName));
      // }
      router[route.method](route.url,route.handle);  
    });
    app.use(path, router);
  } 
  

module.exports = function(app){
  bindMiddlewares(app,'/',require('../model/router.js'));
}