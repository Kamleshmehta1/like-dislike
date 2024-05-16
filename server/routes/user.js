import express from 'express';
import {
  getUserInfo,
  handleLogin,
  handleRefreshToken,
  handleSignUp,
} from '../controllers/user.js';
import { authenticateToken } from '../utils/middleware.js';

const router = express.Router();

router.post('/signin', handleLogin);

router.post('/signup', handleSignUp);

router.get('/reAuthenticate', handleRefreshToken);
router.get('/profile', authenticateToken, getUserInfo);

export default router;
