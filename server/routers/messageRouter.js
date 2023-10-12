import { Router } from "express";
import MsgController from "../msgController.js";

const router = new Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/getAll', MsgController.getAll);

export default router;