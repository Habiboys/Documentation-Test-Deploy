const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
//include dotenv
require('dotenv').config("./.env");

const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm Password must be same' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({ message: 'User created successfully', user });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'username atau password salah' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'username atau password salah' });
        }
        const accessToken = jwt.sign({ userId: user.id,username: user.username ,role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
      
            const refreshToken = jwt.sign({ userId: user.id,username: user.username,role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
            await User.update({ refreshToken }, { where: { id: user.id } });
        
      
        res.status(200).json({ 
            message: 'Login berhasil', 
            accessToken
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token diperlukan' });
        }

        const user = await User.findOne({ where: { refreshToken } });
        if (!user) {
            return res.status(404).json({ message: 'Token tidak valid' });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            if (decoded.userId !== user.id) {
                return res.status(401).json({ message: 'Token tidak valid' });
            }

            const accessToken = jwt.sign(
                { userId: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );
            
            res.status(200).json({ accessToken });
        } catch (err) {
            return res.status(401).json({ message: 'Token tidak valid atau kadaluarsa' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    register,
    login,
    refreshToken
}