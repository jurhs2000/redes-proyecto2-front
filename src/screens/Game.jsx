import React from "react";
import Button from '@mui/material/Button';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/user/userSlice';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

const Game = () => {
  const dispatch = useAppDispatch();

  return (
    <div style={styles.container}>
      <h1>Game</h1>
      <Button variant="contained" onClick={() => dispatch(logout())}>Salir</Button>
    </div>
  );
};

export default Game;
