import React, { useState, useEffect } from "react";
import axios from "axios";

export const Player = () => {
    const [player, setPlayer] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/api/player/643217e125bbaec8b311ffc4')
            .then(response => {
                setPlayer(response.data);
            })
            .catch(error => console.error(error))
    }, []);
// we added the ternary statement due to the time (seconds) it takes to load the data into state
    return (
        <>
        {!player ? <h1>Loading... </h1> : <h1>Current Player: {player.name}</h1>}

        </>
    )
}