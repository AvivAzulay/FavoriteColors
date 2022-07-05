import { Router } from "express";
import ColorsController from "./controllers/ColorsController";

const routes = Router();

// Colors
routes.get("/colors", ColorsController.getAll);
routes.put("/colors/vote", ColorsController.updateColor);
routes.put("/colors/update/all", ColorsController.updateAll);

export default routes;
