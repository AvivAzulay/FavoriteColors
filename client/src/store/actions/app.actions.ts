import { Color } from "../../types/Color";
import { colorsService } from "../../services/colors.service";
import { AppDispatch } from "../store";

const _setColors = (colors: Color[]) => ({ type: "SET_COLORS", colors });
const _updateColor = (color: Color, idx: number) => ({ type: "UPDATE_COLOR", color, idx });
const _setError = () => ({ type: "SET_ERROR" });
const _clearError = () => ({ type: "CLEAR_ERROR" });

const LOCAL_STORAGE_KEY = "e84b-13d3-colors";

// THUNK
export function loadColors(isServerError: boolean = false) {
  return async (dispatch: AppDispatch) => {
    try {
      let data: Color[];
      if (isServerError) {
        data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
      } else {
        data = await colorsService.query();
      }
      dispatch(_setColors(data));
    } catch (error: any) {
      dispatch(_setError());
    }
  };
}

export function voteColor(color: Color, idx: number, error: boolean) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(_updateColor(color, idx));
      await colorsService.update(color);
      if (error) dispatch(_clearError());
    } catch (error: any) {
      dispatch(_setError());
    }
  };
}

export function updtaeColorsFromLocalStorage() {
  return async (dispatch: AppDispatch) => {
    try {
      const colors: Color[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
      if (colors.length === 0) return;
      dispatch(_setColors(colors));
      await colorsService.updateAll(colors);
    } catch (error: any) {
      dispatch(_setError());
    }
  };
}

export function setColorsToLocalStorage(colors: Color[]) {
  return () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(colors));
  };
}

export function setError() {
  return (dispatch: AppDispatch) => {
    dispatch(_setError());
  };
}

export function clearError() {
  return (dispatch: AppDispatch) => {
    dispatch(_setError());
  };
}
