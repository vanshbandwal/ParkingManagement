const express = require('express')
const { startParking, getParking, exitParking, userInfo,getInfo } = require('../controller/ParkingController')
const authMiddleware = require('../Middleware/authMiddleware.js')
const router = express.Router()

router.post('/',authMiddleware,startParking)
router.get('/',authMiddleware,getParking)
router.post('/exit',authMiddleware,exitParking)
router.get('/user',authMiddleware,userInfo)
router.get("/info/:vehicleNumber",authMiddleware, getInfo);
module.exports = router