import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeRoom, selectUser } from '../features/user/userSlice';
import Card from "../components/card";
import userPNG from '../assets/svg/user.png';
import roomPNG from '../assets/svg/room.png';
import logoSVG from '../assets/svg/logo.svg';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#bbdefb",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    info: {
      display: "flex",
      alignItems: "center",
    },
    user: {
      height: "2em",
      margin: "0 5px 0 10px",
    },
    room: {
      height: "2.2em",
      margin: "0 5px 0 25px",
    },
    logo: {
      width: "10%",
    },
    leave: {
      height: "50%",
      margin: "0 10px 0 0",
    },
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "50vw",
  },
  card: {
    margin: "2px",
    cursor: "pointer",
  },
  selectedCard: {
    border: "2px solid blue",
    transform: "scale(1.4)",
    boxShadow: "0px 0px 11px 3px rgba(0,0,0,0.55)",
    transition: "transform 0.2s ease-out",
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
  //'ace_of_spades2',
  //'black_joker',
  //'jack_of_clubs',
  'jack_of_clubs2',
  //'jack_of_diamonds',
  'jack_of_diamonds2',
  //'jack_of_hearts',
  'jack_of_hearts2',
  //'jack_of_spades',
  'jack_of_spades2',
  //'king_of_clubs',
  'king_of_clubs2',
  //'king_of_diamonds',
  'king_of_diamonds2',
  //'king_of_hearts',
  'king_of_hearts2',
  //'king_of_spades',
  'king_of_spades2',
  //'queen_of_clubs',
  'queen_of_clubs2',
  //'queen_of_diamonds',
  'queen_of_diamonds2',
  //'queen_of_hearts',
  'queen_of_hearts2',
  //'queen_of_spades',
  'queen_of_spades2',
  //'red_joker',
]

const Game = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleExitGame = () => {
    dispatch(removeRoom());
    navigate("/");
  };

  useEffect(() => {
    if (user.status === 'not joined') {
      navigate("/");
    }
  }, [user.status, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.header.info}>
          <img src={userPNG} alt="user" style={styles.header.user}/>
          <p>{user.value.username}</p>
          <img src={roomPNG} alt="user" style={styles.header.room}/>
          <p>{user.value.room}</p>
        </div>
        <img src={logoSVG} alt="logo" style={styles.header.logo}/>
        <Button variant="contained" style={styles.header.leave} onClick={() => handleExitGame()}>Salir</Button>
      </div>
      <div style={styles.cardsContainer}>
        {cards.map((card) => (
          <div key={card} style={selectedCard === card ? styles.selectedCard : styles.card} onClick={() => setSelectedCard(card)}>
            <Card id={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
