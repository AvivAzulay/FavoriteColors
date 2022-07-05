import {
  loadColors,
  setColorsToLocalStorage,
  updtaeColorsFromLocalStorage,
  voteColor,
} from "../../store/actions/app.actions";
import { RootState } from "../../store/store";
import { Color } from "../../types/Color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Dispatch } from "redux";
import "./Colors.scss";

const socket = io("http://localhost:3030");

export const Colors = () => {
  const [maxVotes, setMaxVotes] = useState<number>(0);
  const dispatch: Dispatch<any> = useDispatch();
  const { colors, isServerError } = useSelector((state: RootState) => state.appModule);

  useEffect(() => {
    if (!isServerError) {
      socket.on("color_voted", ({ newVotedColor, idx }) => {
        dispatch(voteColor(newVotedColor, idx, true));
      });
    }
  }, [dispatch, isServerError]);

  useEffect(() => {
    getMaxColorsVotes();
    // eslint-disable-next-line
  }, [maxVotes]);

  useEffect(() => {
    if (colors.length === 0) fetchColorsData();
    // eslint-disable-next-line
  }, [colors.length]);

  useEffect(() => {
    colors.length !== 0 && dispatch(setColorsToLocalStorage(colors));
  }, [colors, dispatch]);

  useEffect(() => {
    if (isServerError) {
      dispatch(loadColors(isServerError));
    } else dispatch(updtaeColorsFromLocalStorage());
  }, [isServerError, dispatch]);

  const fetchColorsData = () => {
    dispatch(loadColors(isServerError));
  };

  const getMaxColorsVotes = () => {
    let max = 0;
    colors.forEach((color: Color) => {
      if (color.votes > max) max = color.votes;
    });
    setMaxVotes(max);
  };

  const getColorVotesWidth = (colorVotes: number) => {
    if (maxVotes === 0) setMaxVotes(1);
    if (colorVotes >= maxVotes) return 200;
    return 200 * (colorVotes / maxVotes);
  };

  const getColors = () => {
    return colors.map((color: Color, idx: number) => {
      return (
        <div
          className="color"
          onClick={() => increaseColorVotes(idx)}
          style={{ backgroundColor: color?.value }}
          key={idx}
        >
          <span className="votes" style={{ width: getColorVotesWidth(color.votes) }}>
            <p className="vote-amount">{color.votes}</p>
          </span>
        </div>
      );
    });
  };

  const increaseColorVotes = (idx: number) => {
    if (maxVotes < colors[idx].votes + 1) setMaxVotes(colors[idx].votes + 1);
    const newVotedColor = { ...colors[idx] };
    newVotedColor.votes += 1;
    dispatch(voteColor(newVotedColor, idx, isServerError));
    if (!isServerError) {
      socket.emit("vote_color", { newVotedColor, idx });
    }
  };

  return (
    <div className="colors-container">
      <h1> Favorite Colors - Let's vote!</h1>
      <div className="colors-wrapper">{getColors()}</div>
    </div>
  );
};
