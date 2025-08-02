import { Router } from "express";
import { ParcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


const parcelRouter = Router();

parcelRouter.post('/create', checkAuth(Role.SENDER, Role.ADMIN), ParcelController.createParcel);

parcelRouter.patch('/status/:id', ParcelController.updateParcelStatus);

parcelRouter.delete('/:id', ParcelController.deleteParcel)

parcelRouter.get('/all-parcels', checkAuth(Role.ADMIN), ParcelController.getAllParcels)



export default parcelRouter;