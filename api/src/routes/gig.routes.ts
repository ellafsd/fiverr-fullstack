import express from "express";
import {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
  updateGig,
} from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.middleware.js";
import upload from "../utils/multer.js";

// 1) Create router
const router = express.Router();

// 2) Define endpoints
router
  .route("/")
  .get(getAllGigs)
  .post(
    protect,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    createGig
  );

router.route("/:id").get(getGig).patch(protect, updateGig).delete(protect, deleteGig);

// 3) Export router to register it in the app
export default router;
