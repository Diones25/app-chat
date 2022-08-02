const User = require("../models/userModel.js");
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try{

        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });

        if (usernameCheck) {
            return res.json({ msg: "O usuário já existe! ", status: false })
        }
        if (emailCheck) {
            return res.json({ msg: "O email já existe! ", status: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        delete user.password;
        return res.jsonn({ user, status: true });

    }catch(err) {
        next(err)
    }
}

module.exports = {
    register
} 