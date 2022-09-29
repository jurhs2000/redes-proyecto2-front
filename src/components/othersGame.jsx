import React from "react";
import crownPNG from "../assets/svg/crown.png";
import Card from "./card";
import loaderGIF from "../assets/svg/loader.gif";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  partyLeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    crown: {
      width: "20px",
      height: "20px",
    },
    label: {
      margin: "0 0 0 5px",
      fontSize: "0.7em",
    },
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: '0 0 10px 0',
    text: {
      fontSize: "1.5em",
      fontWeight: "bold",
      margin: "0px",
    },
  },
  cardsText: {
    margin: "0",
    fontSize: "0.7em",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    card: {
      margin: "4px",
    },
  },
  turn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10% 0",
    loader: {
      width: "25px",
      height: "25px",
    },
    text: {
      margin: "0 0 0 5px",
      fontSize: "1em",
    },
  },
  cardGiven: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    text: {
      margin: "0 0 5px 0",
      fontSize: "0.7em",
    },
  },
};

const OthersGame = (props) => {
  return (
    <div style={styles.container}>
      { props.roomUser.isPartyLeader ? 
        <div style={styles.partyLeader}>
          <img src={crownPNG} style={styles.partyLeader.crown} alt="crown" />
          <p style={styles.partyLeader.label}>Party Leader</p>
        </div>
        : null
      }
      <div style={styles.title}>
        <p style={styles.title.text}>{props.roomUser.username}</p>
      </div>
      <p style={styles.cardsText}>{props.roomUser.cards} cartas</p>
      <div style={styles.cardsContainer}>
        {
          [...Array(props.roomUser.cardGiven ? (props.roomUser.cards - 1) : props.roomUser.cards)].map((e, i) => {
            return (
              <div key={i} style={styles.cardsContainer.card}>
                <Card id="back" small={true} />
              </div>
            );
          })
        }
      </div>
      {
        props.roomUser.isInTurn ? 
          <div style={styles.turn}>
            <img src={loaderGIF} style={styles.turn.loader} alt="loader" />
            <p style={styles.turn.text}>En Turno</p>
          </div>
          : null
      }
      {
        props.roomUser.cardGiven ? 
          <div style={styles.cardGiven}>
            <p style={styles.cardGiven.text}>Carta Jugada</p>
            <Card id="back" small={true} />
          </div>
          : null
      }
    </div>
  );
};

export default OthersGame;
