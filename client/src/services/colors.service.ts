import { Color } from "../types/Color";
import { httpService } from "./http.service";

export const colorsService = {
  query,
  update,
  updateAll,
};

async function query() {
  try {
    return await httpService.get("colors");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(color: Color) {
  try {
    return await httpService.put("colors/vote", color);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateAll(colors: Color[]) {
  try {
    return await httpService.put("colors/update/all", colors);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
