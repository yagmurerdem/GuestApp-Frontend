import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
//import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
//import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';
//import FavoriteIcon from '@mui/icons-material/Favorite';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : '',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function PostForm(props) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const { kisiId, kisiName, refreshPosts } = props;  
    const [isSent, setIsSent] = useState(false); //post isteği gönderdik mi database e. onun için yazıyoruz

    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    kisiId: kisiId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true); //evet post isteğini gönderdim
        setTitle(""); //post işlemi gönderilince bu alanı boşaltmaya yarar
        setText("");//post işlemi gönderilince bu alanı boşaltmaya yarar
        refreshPosts(); //database e gidip postları tekrar çeker,state imiz değiştiği için sayfamız renderlanmış olur
    }

    //handleTitle,handleText input alanına birşeyler girmeye  başladığımda çağrılan fonksiyonlardır
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false); //şuan birşeyler giriliyor daha gönderilmedi
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);//şuan birşeyler giriliyor daha gönderilmedi
    }

    //const classes = ExpandMore();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (

        <div>


            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post is Sent!
                </Alert>
            </Snackbar>


            <div className="postContainer"> 

                <Card sx={{ width: 800, textAlign: 'left', margin: 2 }}>
                    <CardHeader
                        avatar={
                            <Link to={{ pathname: '/kisiler/' + kisiId }} sx={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
                                <Avatar sx={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)' }} aria-label="recipe">
                                    {kisiName.charAt(0).toUpperCase()}
                                </Avatar>
                            </Link>
                        }
     
                        title={<OutlinedInput
                            id="outlined-password-input"
                            multiline
                            placeholder='Title'
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)} 
                            //label="Password"
                           // type="password"
                           // autoComplete="current-password"
                        
                        >

                        </OutlinedInput>}

                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary" component="span">
                            <OutlinedInput component="span"
                                id="outlined-password-input"
                                multiline
                                placeholder='Text'
                                inputProps={{ maxLength: 250 }}
                                fullWidth
                                value={text}
                                onChange={(i) => handleText(i.target.value)}
                              //  label="Passwordmerhaba"
                                //type="password"
                                autoComplete="current-password"
                               
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            style={{
                                                background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                                                color: 'white'
                                            }}
                                            onClick={handleSubmit}
                                        >Post</Button>
                                    </InputAdornment>
                                }
                            >

                            </OutlinedInput>
                        </Typography>
                    </CardContent>

                </Card>

            </div>


        </div>


    )
}
