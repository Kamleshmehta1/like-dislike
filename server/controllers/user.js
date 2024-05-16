import users from '../models/user.js';
import bcrypt from 'bcryptjs';
import refreshSchema from '../models/refreshToken.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/middleware.js';
import jwt from 'jsonwebtoken';

export async function handleLogin(req, res) {
  const { email, password } = req.body;

  let response;
  try {
    response = await users.findOne({
      email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  if (!response?.email) {
    return res.status(400).send({
      message: 'Email id  not found!',
    });
  }

  const isMatch = await bcrypt.compare(password, response?.password);

  if (!isMatch) {
    return res.status(401).send({
      message: 'Invalid password',
    });
  }

  try {
    await refreshSchema.deleteOne({
      email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  const user = { email, _id: response?._id };

  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    try {
      await refreshSchema.create({
        email,
        token: refreshToken,
      });
    } catch (error) {
      return res.status(400).send({
        message: error?.message,
      });
    }

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      maxAge: +process.env.ACCESS_TOKEN_EXPIRE_TIME,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      maxAge: +process.env.REFRESH_TOKEN_EXPIRE_TIME,
      secure: true,
      sameSite: 'none',
    });
    return res
      .status(200)
      .json({ status: 200, message: 'Login successfully!' });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}

export async function handleSignUp(req, res) {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Password doesn't match",
    });
  }

  let response;
  try {
    response = await users.findOne({
      email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  if (response?.email && email && response?.email === email) {
    return res.status(400).send({
      message: 'Email already exists!',
    });
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 13);
  } else {
    return res.status(400).send({
      status: 200,
      message: 'Kindly enter password!',
    });
  }

  try {
    await users.create({
      email,
      password: hashedPassword,
    });
    return res.status(200).send({
      status: 200,
      message: 'Sign up successfully!',
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}

export async function handleRefreshToken(req, res) {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(400).send({ message: 'Refresh token expired!' });

  let refreshResponse;
  try {
    refreshResponse = await refreshSchema.findOne({
      email: req?.user?.email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  if (refreshResponse?.email !== req?.user?.email)
    return res.status(403).send({ message: 'Refresh token not found !' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    const user = { email: data?.email };
    const accessToken = generateAccessToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      maxAge: +process.env.ACCESS_TOKEN_EXPIRE_TIME,
      secure: true,
      sameSite: 'none',
    });
    return res.json({ status: 200, message: 'Authenticated!' });
  });
}

export async function getUserInfo(req, res) {
  let response;
  try {
    response = await users.findOne(
      {
        email: req?.user?.email,
      },
      { password: 0 }
    );
  } catch (error) {
    return res.status(500).json(error);
  }

  try {
    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(403).send({ message: error?.message });
  }
}
