import express from "express"
import { createProfile, getProfile } from "../controllers/profileController.js"

const router=express.Router()
import { profileSchema } from "../validations/profileSchema.js"
import validateSchema from "../middleware/validateSchema.js"


router.get("/",getProfile)
router.post("/create",validateSchema(profileSchema),createProfile)


export default router