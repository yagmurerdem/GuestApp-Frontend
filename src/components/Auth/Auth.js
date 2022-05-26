//register ve login aynı form olucak

import { FormControl, FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react';

function Auth() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleUserName = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                userName: username,
                password: password,

            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUser", result.userId),
                    localStorage.setItem("userName", username)
            })
            .catch((err) => console.log(err))
    }

    const handleRegister = () => {
        sendRequest("register")
        setUsername("")
        setPassword("")
        history.go("/auth")
    }

    const handleLogin = () => {
        sendRequest("login")
        setUsername("")
        setPassword("")
    }

    return (
        <FormControl>
            <InputLabel> UserName</InputLabel>
            <Input onChange={(i) => handleUserName(i.target.value)} />
            <InputLabel style={{ top: 80 }}> Password</InputLabel>
            <Input style={{ top: 40 }}
                onchange={(i) => handlePassword(i.target.value)} />
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                    color: 'white'
                }}
                onClick={handleRegister()}>Register</Button>

            <FormHelperText style={{ margin: 20 }}>Are you already registered? </FormHelperText>
            <Button variant="contained"
                style={{
                    background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                    color: 'white'
                }}
                onClick={handleLogin()}>Login</Button>
        </FormControl>
    )

}
export default Auth;