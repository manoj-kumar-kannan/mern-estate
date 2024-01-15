import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { errorHandler } from '../util/error.js';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, 'Invalid Credentials !!!'));

    const payload = {
      id: validUser._id,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie('accessToken', accessToken, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
