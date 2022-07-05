import { AnyAction } from "@reduxjs/toolkit";
import { Color } from "../../types/Color";

const initialState = {
  colors: [] as Color[],
  isServerError: false,
};

export function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "SET_COLORS":
      return { ...state, colors: [...action.colors] };

    case "UPDATE_COLOR":
      const newColors = [...state.colors];
      newColors[action.idx] = action.color;
      return { ...state, colors: [...newColors] };

    case "SET_ERROR":
      return { ...state, isServerError: true };

    case "CLEAR_ERROR":
      return { ...state, isServerError: false };

    default:
      return state;
  }
}
