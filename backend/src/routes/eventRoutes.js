import express from "express"
import { createEvent, getEventDetail } from "../controllers/eventController.js";
import validateSchema from "../middleware/validateSchema.js";
import { eventSchema } from "../validations/eventSchema.js";

const router=express.Router();


router.post("/create",validateSchema(eventSchema),createEvent)
router.get("/:id",getEventDetail)

export default router

