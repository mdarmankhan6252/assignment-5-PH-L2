import { Router } from "express";
import { ParcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


const parcelRouter = Router();

parcelRouter.post('/create', ParcelController.createParcel);

parcelRouter.patch('/status/:id', ParcelController.updateParcelStatus);

parcelRouter.delete('/:id', ParcelController.deleteParcel)

parcelRouter.get('/all-parcels', checkAuth(Role.ADMIN), ParcelController.getAllParcels)

parcelRouter.get('/get-parcel-by-email', ParcelController.getParcelByEmail)

parcelRouter.get('/:id', ParcelController.getParcelById);



export default parcelRouter;