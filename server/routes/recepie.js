import express from 'express';
import {
  addReceipe,
  deleteRecepie,
  getReceipe,
  updateRecepie,
  updateRecepieForDisLike,
  updateRecepieForLikes,
} from '../controllers/recepie.js';
import { authenticateToken } from '../utils/middleware.js';
import { upload } from '../utils/multer.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .post(upload.single('recepieImg'), addReceipe)
  .get(getReceipe)
  .delete(deleteRecepie)
  .put(upload.single('recepieImg'), updateRecepie);

router.put('/like', updateRecepieForLikes);
router.put('/unlike', updateRecepieForDisLike);

export default router;
