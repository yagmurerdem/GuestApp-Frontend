import { InputAdornment, OutlinedInput,CardContent,Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Comment(props) {
    const { text, kisiId, kisiName } = props;




    return (
        <CardContent>
            <OutlinedInput
                disabled //birşey girilemesin

                id="outlined-password-input"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                //label="Password"
                value={text}
              //  type="password"
               // autoComplete="current-password"
             
             
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/kisiler/' + kisiId }} sx={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
                            <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)' }} aria-label="recipe">
                                {kisiName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{color:"black",backgroundColor:'white'}}
            >

            </OutlinedInput>
        </CardContent>
    )
}