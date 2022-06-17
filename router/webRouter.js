import { Router } from 'express';
import webControllers from '../controllers/webContriller.js';

const router = new Router()

router.get('/', webControllers.inicio)

export default router