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
        return res.json({ user, status: true });

    }catch(err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "O usuário ou senha incorreto! ", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "O usuário ou senha incorreto! ", status: false })
        }
        delete user.password;
        return res.json({ user, status: true });
    }catch(err) {
        next(err)
    }
}

module.exports = {
    register,
    login
} 