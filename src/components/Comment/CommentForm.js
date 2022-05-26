import { InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function CommentForm(props) {

    const {kisiId, kisiName, id } = props;
    const[text,setText]=useState("");


    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: id, //post id
                    kisiId: kisiId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }


    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange =(value)=>{
        setText(value);
    }


    return (
        <CardContent>
            <OutlinedInput

                id="outlined-password-input"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text} //kullanıcının yazdığı yerdir
                
                autoComplete="current-password"

                onChange={(i) =>handleChange(i.target.value)} //value yu handleChange e atıyoruz

                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/kisiler/' + kisiId }} sx={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)' }} aria-label="recipe">
                                {kisiName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">

                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >Comment</Button>

                    </InputAdornment>
                }
                style={{ color: "black", backgroundColor: 'white' }}
            >

            </OutlinedInput>
        </CardContent>
    )
}