import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/user/userSlice';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleStartGame = () => {
    dispatch(login({ username, room }));
    navigate("/game");
  };

  return (
    <div style={styles.container}>
      <h1>Home</h1>
      <TextField id="input-username" label="Username" value={username} onChange={handleUsernameChange} variant="outlined" />
      <TextField id="input-room" label="Room" value={room} onChange={handleRoomChange} variant="outlined" />
      <Button variant="contained" onClick={() => handleStartGame()}>Comenzar</Button>
    </div>
  );
};

export default Home;
