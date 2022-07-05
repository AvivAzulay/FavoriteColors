import { Request, Response } from "express";
import { Color } from "../types/Color";
import colorsService from "../services/colorsService";

export class ColorConroller {
  public async getAll(req: Request, res: Response) {
    try {
      const colors = await colorsService.getAll();
      res.send(colors);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  public async updateColor(req: Request, res: Response) {
    try {
      const colorToVote: Color = req.body;
      await colorsService.updateColor(colorToVote);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  public async updateAll(req: Request, res: Response) {
    try {
      const colors: Color[] = req.body;
      await colorsService.updateAll(colors);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}
export default new ColorConroller();
