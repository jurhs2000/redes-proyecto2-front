import React from "react";
import { dateFormat } from "../features/communication.utils";

const styles = {
  chat: {
    backgroundColor: "rgb(187, 222, 251)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
    borderRadius: "10px",
    margin: "5px",
    head: {
      display: "flex",
      alignItems: "center",
      margin: "5px 0 0 15px",
      username: {
        margin: "0 10px 0 0",
        fontWeight: "bold",
      },
      date: {
        margin: "0",
        fontSize: "0.7em",
      },
    },
    text: {
      margin: "5px 15px 10px 15px",
    },
  },
};

const MessageBubble = (props) => {
  return (
    <div style={styles.chat}>
      <div style={styles.chat.head}>
        <p style={styles.chat.head.username}>{props.message.username}</p>
        <p style={styles.chat.head.date}>{dateFormat(props.message.date)}</p>
      </div>
      <p style={styles.chat.text}>{props.message.messages}</p>
    </div>
  );
};

export default MessageBubble;
