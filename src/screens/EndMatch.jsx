import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bbdefb",
        height: "100vh",
        width: "100vw",
    },
    title: {
        text: {
            fontSize: "1.5em",
            fontWeight: "bold",
            margin: "0px",
        },
    },
    text: {
        margin: "0",
        fontSize: "1em",
    },
    button: {
        margin: "10px 0",
    },
};

const EndMatch = ({ winner, username }) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <p style={styles.title.text}>Partida terminada</p>
            {
                winner === username ?
                    <p style={styles.text}>¡Has ganado!</p>
                    :
                    <p style={styles.text}>{`¡${winner} ha ganado!`}</p>
            }
            <Button variant="contained" style={styles.button} color="primary" onClick={handleGoHome}>Ir a inicio</Button>
        </div>
    );
};

export default EndMatch;