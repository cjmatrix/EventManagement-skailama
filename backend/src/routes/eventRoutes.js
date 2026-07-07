import express from "express"
import { createEvent, getEventDetail, updateEventDetail } from "../controllers/eventController.js";
import validateSchema from "../middleware/validateSchema.js";
import { eventSchema } from "../validations/eventSchema.js";
import { updateEventSchema } from "../validations/UpdateEVentSchema.js";

const router=express.Router();


router.post("/create",validateSchema(eventSchema),createEvent)
router.get("/:id",getEventDetail)

router.patch("/:id/update",validateSchema(updateEventSchema),updateEventDetail)

export default router

