import mongoose from 'mongoose';
import User from '../models/user';

const UserController = {};

UserController.getUsers = async (req, res) => {
    try {
        User.find().then( data => res.json({
            message: 'success',
            user: data
        }));
        
    } catch (e) {
        return res.json({
            message: 'not found'
        })
    }
}

UserController.addUser = async (req, res) => {
    try {
        const {userName, password, fullname} = req.body;
        if (!password) {
            return res.status(400).json({
                message: 'err',
            })
        }
        const user = new User ({
            _id: new mongoose.Types.ObjectId(),
            userName,
            password,
            fullname
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user: user
        });
   } catch (e) {    
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            
        });
   }
};
UserController.updateUser = async (req, res) => {
    try {
        let data = await User.findById(req.params.idUser);
        if (!data) {
            return res.json({message: 'False'});
        }
        data.userName = req.body.userName;
        data.password = req.body.password;
        data.fullname = req.body.fullname;
        await data.save();
        return res.json({
                isSuccess: true,
                user: data
        });     
       
    } catch (e) {
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            
        });
    }
}

UserController.deleteUser = async (req, res) => {
        try {
            
            await User.findById(req.params.idUser).deleteOne(function() {
                return res.json({message: 'success'});
            });

        } catch (e) {
            return res.status(400).json({
                isSuccess: false,
                message: e.message,
                
            });
        } 
}




export default UserController;
