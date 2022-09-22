import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout, selectUser } from '../features/user/userSlice';
import Card from "../components/card";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)",
    gridGap: "1rem",
    width: "75%",
  },
  selectedCard: {
    border: "2px solid red",
  },
};

const cards = [
  '2_of_clubs',
  '2_of_diamonds',
  '2_of_hearts',
  '2_of_spades',
  '3_of_clubs',
  '3_of_diamonds',
  '3_of_hearts',
  '3_of_spades',
  '4_of_clubs',
  '4_of_diamonds',
  '4_of_hearts',
  '4_of_spades',
  '5_of_clubs',
  '5_of_diamonds',
  '5_of_hearts',
  '5_of_spades',
  '6_of_clubs',
  '6_of_diamonds',
  '6_of_hearts',
  '6_of_spades',
  '7_of_clubs',
  '7_of_diamonds',
  '7_of_hearts',
  '7_of_spades',
  '8_of_clubs',
  '8_of_diamonds',
  '8_of_hearts',
  '8_of_spades',
  '9_of_clubs',
  '9_of_diamonds',
  '9_of_hearts',
  '9_of_spades',
  '10_of_clubs',
  '10_of_diamonds',
  '10_of_hearts',
  '10_of_spades',
  'ace_of_clubs',
  'ace_of_diamonds',
  'ace_of_hearts',
  'ace_of_spades',
  'ace_of_spades2',
  'black_joker',
  'jack_of_clubs',
  'jack_of_clubs2',
  'jack_of_diamonds',
  'jack_of_diamods2',
  'jack_of_hearts',
  'jack_of_hearts2',
  'jack_of_spades',
  'jack_of_spades2',
  'king_of_clubs',
  'king_of_clubs2',
  'king_of_diamonds',
  'king_of_diamonds2',
  'king_of_hearts',
  'king_of_hearts2',
  'king_of_spades',
  'king_of_spades2',
  'queen_of_clubs',
  'queen_of_clubs2',
  'queen_of_diamonds',
  'queen_of_diamonds2',
  'queen_of_hearts',
  'queen_of_hearts2',
  'queen_of_spades',
  'queen_of_spades2',
  'red_joker',
]

const Game = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleExitGame = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Game</h1>
      <p>{user.value.username}</p>
      <div style={styles.cardsContainer}>
        {cards.map((card) => (
          <div key={card} style={selectedCard === card ? styles.selectedCard : {}} onClick={() => setSelectedCard(card)}>
            <Card id={card} />
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={() => handleExitGame()}>Salir</Button>
    </div>
  );
};

export default Game;
