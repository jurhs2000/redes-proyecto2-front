import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeRoom, selectUser } from "../features/user/userSlice";
import Card from "../components/card";
import userPNG from "../assets/svg/user.png";
import roomPNG from "../assets/svg/room.png";
import logoSVG from "../assets/svg/logo.svg";
import crownPNG from "../assets/svg/crown.png";
import {
  changeTurn,
  getCards,
  getMessage,
  getMessages,
  getRoomUsers,
  reqRoomUsers,
  returnHand,
  sendCard,
  sendCardResult,
  sendMessageRoom,
  startChallenge,
} from "../services/game.socket";
import MessageBubble from "../components/messageBubble";
import OthersGame from "../components/othersGame";
import { getCardNameFormatted } from "../features/communication.utils";

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
    height: "50px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    top: 0,
    info: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    user: {
      height: "2em",
      margin: "0 5px 0 10px",
    },
    room: {
      height: "2.2em",
      margin: "0 5px 0 25px",
    },
    leader: {
      height: "1.5em",
      margin: "0 5px 0 25px",
    },
    logo: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      img: {
        width: "40%",
      },
    },
    leave: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
      button: {
        height: "50%",
        margin: "0 10px 0 0",
      },
    },
  },
  gameContainer: {
    display: "flex",
    width: "100%",
    height: "calc(100vh - 50px)",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: 'calc(100vh - 50px)',
    backgroundColor: "white",
    borderRight: "2px solid rgb(200 205 255)",
    boxShadow: "0 0 10px 0 #00000024",
    messages: {
      width: "20%",
      minWidth: "250px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto",
      flex: 1,
      message: {
        backgroundColor: "rgb(187 251 233)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        borderRadius: "10px",
        margin: "5px",
        text: {
          margin: '5px',
          fontSize: '0.8em',
        },
      },
    },
    send: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px 0",
      input: {
        width: "90%",
      },
      button: {
        marginTop: "10px",
        height: "25px",
      },
    },
  },
  cardGameContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "50vw",
  },
  othersGame: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gameInfo: {
    backgroundColor: "rgb(142 199 255)",
    width: "100%",
    padding: "15px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  myGame: {
    flex: 1,
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "40px 0 0 0",
    }
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
  "2_of_clubs",
  "2_of_diamonds",
  "2_of_hearts",
  "2_of_spades",
  "3_of_clubs",
  "3_of_diamonds",
  "3_of_hearts",
  "3_of_spades",
  "4_of_clubs",
  "4_of_diamonds",
  "4_of_hearts",
  "4_of_spades",
  "5_of_clubs",
  "5_of_diamonds",
  "5_of_hearts",
  "5_of_spades",
  "6_of_clubs",
  "6_of_diamonds",
  "6_of_hearts",
  "6_of_spades",
  "7_of_clubs",
  "7_of_diamonds",
  "7_of_hearts",
  "7_of_spades",
  "8_of_clubs",
  "8_of_diamonds",
  "8_of_hearts",
  "8_of_spades",
  "9_of_clubs",
  "9_of_diamonds",
  "9_of_hearts",
  "9_of_spades",
  "10_of_clubs",
  "10_of_diamonds",
  "10_of_hearts",
  "10_of_spades",
  "ace_of_clubs",
  "ace_of_diamonds",
  "ace_of_hearts",
  "ace_of_spades",
  "jack_of_clubs2",
  "jack_of_diamonds2",
  "jack_of_hearts2",
  "jack_of_spades2",
  "king_of_clubs2",
  "king_of_diamonds2",
  "king_of_hearts2",
  "king_of_spades2",
  "queen_of_clubs2",
  "queen_of_diamonds2",
  "queen_of_hearts2",
  "queen_of_spades2",
];

const Game = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const messagesContainerRef = useRef();
  const [selectedCard, setSelectedCard] = useState(null);
  const [hand, setHand] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [state, setState] = useState({
    turn: -1,
    usernameTurn: null,
    cardPlayedName: null,
  });
  const [hint, setHint] = useState(null);
  const [instruction, setInstruction] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTruth, setIsTruth] = useState(false);
  const [firsTimeUsers, setFirstTimeUsers] = useState(false);

  const handleExitGame = () => {
    dispatch(removeRoom());
    navigate("/");
  };

  const getSameNumberCards = () => {
    const sameNumberCards = cards.filter((card) => {
      const cardNumber = card.split("_")[0];
      const previousCardNumber = state.cardPlayedName.split("_")[0];
      return cardNumber === previousCardNumber;
    });
    return sameNumberCards;
  };

  const getCardsFromHand = (sameNumberCards) => {
    // cards is the array of cards to find in the hand
    const handCardsNames = hand.map((card) => {
      return cards[card];
    })
    const cardsMatch = sameNumberCards.filter((card) => {
      return handCardsNames.includes(card);
    });
    return cardsMatch;
  };

  const getTruth = () => {
    if (state.turn === 0) {
      const sameNumberCards = getSameNumberCards();
      const cardsFromHand = getCardsFromHand(sameNumberCards);
      if (cardsFromHand.length > 0) {
        setHint(`Puedes jugar las cartas: ${cardsFromHand.map((cardHand) => getCardNameFormatted(cardHand)).join(", ")} de tu mano`);
      } else {
        setHint("No tienes cartas para jugar");
      }
      if (selectedCard && cardsFromHand.includes(cards[selectedCard])) {
        setIsTruth(true);
      } else {
        setIsTruth(false);
      }
    }
  }

  const handleSetMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message !== "") {
      sendMessageRoom({ username: user.value.username, room: user.value.room, text: message, date: new Date() });
      setMessage("");
    }
  };

  const isPartyLeader = () => {
    return roomUsers?.[0]?.username === user.value.username;
  };

  // solo se ejecuta una vez
  const handleReturnHand = (res) => {
    setHand(res.cards);
    setSelectedCard(null);
    setFirstTimeUsers(true);
  };

  const handleRoomUsers = (res) => {
    setRoomUsers(res.users.map((user, index) => ({ ...user, isPartyLeader: user.username === res.users[0].username, order: index, cards: 10, isInTurn: false, cardGiven: false })));
  };

  const handleSendCard = () => {
    sendCard({ username: user.value.username , room: user.value.room, card: hand.findIndex((card) => card === selectedCard), truth: isTruth });
    changeTurn({ room: user.value.room, newUsernameTurn: roomUsers[(state.turn + 1) % roomUsers.length].username });
  };

  // solo para actualizar las cartas
  const handleSendCardResult = (res) => {
    setHand(res.cards);
  };

  // solo para cambiar el turno
  const handleStartChallenge = () => {
    console.log("start challenge");
    console.log(roomUsers);
    console.log('username', roomUsers[(state.turn + 1) % roomUsers.length].username);
    if (roomUsers.length > 0) {
      setState((prevState) => ({ ...prevState, turn: prevState.turn + 1, usernameTurn: roomUsers[(prevState.turn + 1) % roomUsers.length].username }));
    }
  };

  const getInstructions = () => {
    if (state.turn === 0) {
      setInstruction("Elige una carta con número 2");
    }
  };

  const handleMessage = (res) => {
    setMessages((prev) => [...prev, res]);
    // scroll to bottom
    setTimeout(() => {
      if (messagesContainerRef?.current?.scrollTop) messagesContainerRef.current.scrollTop = messagesContainerRef?.current?.scrollHeight;
    }, 10);
  };

  useEffect(() => {
    returnHand(handleReturnHand);
    getMessage(handleMessage);
    getMessages(handleMessage);
    getRoomUsers(handleRoomUsers);
    reqRoomUsers(user.value.room);
    sendCardResult(handleSendCardResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedRoomUsers = roomUsers.map((roomUser) => {
      if (state.usernameTurn === roomUser.username) {
        return { ...roomUser, isInTurn: true };
      }
      return { ...roomUser, isInTurn: false };
    });
    setRoomUsers(updatedRoomUsers);
    getInstructions();
    getTruth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (selectedCard) {
      getTruth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard]);

  // Solo para indicar el primer jugador al principio del juego
  // Cosas que necesiten los usuarios definidos
  useEffect(() => {
    if (firsTimeUsers) {
      const newState = { turn: state.turn + 1, cardPlayedName: cards[0], usernameTurn: roomUsers?.[0]?.username };
      setState(newState); // Initial state with first user turn
      startChallenge(handleStartChallenge);
      setFirstTimeUsers(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomUsers, firsTimeUsers]);

  useEffect(() => {
    if (user.status === "not joined") {
      navigate("/");
    }
  }, [user.status, navigate]);


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.header.info}>
          <img src={userPNG} alt="user" style={styles.header.user} />
          <p>{user.value.username}</p>
          <img src={roomPNG} alt="room" style={styles.header.room} />
          <p>{user.value.room}</p>
          { isPartyLeader() ? <img src={crownPNG} alt="crown" style={styles.header.leader} /> : null }
          { isPartyLeader() ? <p style={{ fontSize: '0.75em' }}>Party Leader</p> : null }
        </div>
        <div style={styles.header.logo}>
          <img src={logoSVG} alt="logo" style={styles.header.logo.img} />
        </div>
        <div style={styles.header.leave}>
          <Button
            variant="contained"
            style={styles.header.leave.button}
            onClick={() => handleExitGame()}
          >
            Salir
          </Button>
        </div>
      </div>
      <div style={styles.gameContainer}>
        <div style={styles.chatContainer}>
          <div style={styles.chatContainer.messages} ref={messagesContainerRef}>
            {
              messages.map((message, index) => (
                message?.type === 'chat' ?
                  <MessageBubble key={index} message={message}></MessageBubble>
                :
                  <div key={index} style={styles.chatContainer.messages.message}>
                    <p style={styles.chatContainer.messages.message.text}>{message}</p>
                  </div>
              ))
            }
          </div>
          <div style={styles.chatContainer.send}>
            <TextField id="send-message" label="Escribe un mensaje" value={message} onChange={handleSetMessage} variant="filled" />
            <Button variant="contained" style={styles.chatContainer.send.button} onClick={sendMessage}>Enviar</Button>
          </div>
        </div>
        <div style={styles.cardGameContainer}>
          <div style={styles.othersGame}>
            {
              roomUsers?.map((roomUser) => (
                roomUser.username !== user.value.username ?
                  <OthersGame key={roomUser.username} roomUser={roomUser} />
                : null
              ))
            }
          </div>
          <div style={styles.gameInfo}>
            {state.turn === -1 ? (
              isPartyLeader() ? (
                <Button
                  variant="contained"
                  onClick={() =>
                    getCards({
                      username: user.value.username,
                      room: user.value.room,
                    })
                  }
                >
                  Repartir cartas
                </Button>
              ) : (
                <p>Esperando al lider de la partida</p>
              )
            ) : null}
          </div>
          <div style={styles.myGame}>
            { instruction ? <p>{instruction}</p> : null }
            { hint ? <p>{hint}</p> : null }
            <div style={styles.cardsContainer}>
              {hand.map((cardIndex) => (
                <div
                  key={cardIndex}
                  style={
                    selectedCard === cardIndex ? styles.selectedCard : styles.card
                  }
                  onClick={() => setSelectedCard(cardIndex)}
                >
                  <Card id={cards[cardIndex]} />
                </div>
              ))}
            </div>
            {
              // Seleccionar carta
              state.usernameTurn === user.value.username ? (
                <div style={styles.myGame.buttonContainer}>
                  {
                    selectedCard ? (
                      <Button
                        variant="contained"
                        onClick={handleSendCard}
                      >
                        {
                          isTruth ? 'Enviar carta verdadera' : 'Enviar carta falsa'
                        }
                      </Button>
                    ) : (
                      <p>Selecciona una carta</p>
                    )
                  }
                </div>
              ) : <p>Espere su turno</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
