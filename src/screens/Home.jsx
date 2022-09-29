import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import logo from '../assets/svg/logo.svg';
import { addRoom } from "../features/user/userSlice";
import { getError, getMessage, joinRoom } from "../services/game.socket";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bbdefb",
    height: "100vh",
  },
  title: {
    margin: 0,
    logo: {
      width: "80vw",
      maxWidth: "500px",
    }
  },
  subtitle: {
    margin: 0,
    marginBottom: "50px",
    fontFamily: "Montserrat, sans-serif",
  },
  input: {
    marginBottom: "20px",
  },
  button: {
    margin: "10px",
  },
  errorMessage: {
    color: "#d30000",
  },
  hidden: {
    display: "none",
  },
  showing: {
    display: "block",
  },
};

const GAME_TYPE = {
  NONE: 0,
  NEW: 1,
  JOIN: 2,
}

const STATE = {
  NONE: 0,
  WRITING_DATA: 1,
  LOADING: 2,
}

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [gameType, setGameType] = React.useState(GAME_TYPE.NONE);
  const [state, setState] = React.useState(STATE.NONE);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  const checkError = () => {
    if (username === "" && state === STATE.WRITING_DATA) {
      setErrorMessage("Please enter a username");
      return true;
    }
    if (room === "" && state === STATE.WRITING_DATA) {
      setErrorMessage("Please enter a room code");
      return true;
    }
    setErrorMessage("");
    return false;
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleError = (error) => {
    setState(STATE.WRITING_DATA);
    setErrorMessage(error);
  };

  const handleSuccessfullMessage = (message) => {
    if (gameType !== GAME_TYPE.NONE && state === STATE.LOADING) {
      dispatch(addRoom({ username, room }));
      navigate("/game");
    }
  };

  const handleStartGame = () => {
    if (state === STATE.NONE) {
      setGameType(GAME_TYPE.NEW);
      setState(STATE.WRITING_DATA);
    } else if (state === STATE.WRITING_DATA) {
      if (checkError()) return;
      setState(STATE.LOADING);
      joinRoom({ username, room });
    }
  };

  const handleJoinGame = () => {
    if (state === STATE.NONE) {
      setGameType(GAME_TYPE.JOIN);
      setState(STATE.WRITING_DATA);
    } else if (state === STATE.WRITING_DATA) {
      if (checkError()) return;
      setState(STATE.LOADING);
      joinRoom({ username, room });
    }
  };

  useEffect(() => {
    getError(handleError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMessage(handleSuccessfullMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType, state, username, room]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}><img src={logo} alt="logo" style={styles.title.logo}/></h1>
      <h2 style={styles.subtitle}>El juego de cartas</h2>
      { state === STATE.WRITING_DATA ? <TextField id="input-username" style={styles.input} label="Username" value={username} onChange={handleUsernameChange} variant="outlined" /> : null }
      { state === STATE.WRITING_DATA ? <TextField id="input-room" style={styles.input} label="Room Name" value={room} onChange={handleRoomChange} variant="outlined" /> : null }
      <p style={{ ...styles.errorMessage, ...(errorMessage === "" ? styles.hidden : styles.showing) }}>{errorMessage}</p>
      <br/>
      <div>
        { (gameType === GAME_TYPE.NONE || gameType === GAME_TYPE.NEW) ? <Button variant="contained" style={styles.button} onClick={() => handleStartGame()}>Nueva partida</Button> : null }
        { (gameType === GAME_TYPE.NONE || gameType === GAME_TYPE.JOIN) ? <Button variant="contained" style={styles.button} onClick={() => handleJoinGame()}>Unirse a partida</Button> : null }
      </div>
    </div>
  );
};

export default Home;
