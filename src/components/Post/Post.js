import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Link } from "react-router-dom";
import { Container } from '@mui/material';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
//import { useState } from "react";


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


export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false); //aşağı doğru açılıp kapanan ok için
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false) //data geldi gelmedi mi
  const { title, text, kisiId, kisiName, id, likes } = props;
  // const [liked, setLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true); //sayfa ilk kez mi load ediliyor yoksa biri tıkladıda commentleri açtı mı onu söylicek //sayfa açıldığı an commentlerin render edilmesini istemiyoruz.
  const[likeId,setLikeId]=useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments(); //icona tıklandığında verileri çek diyorum
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else {
      deleteLike();
      setLikeCount(likeCount - 1)
    }
  }
  const refreshComments = () => {
    fetch("/comments?id=" + id) //bu postun commentlerini getir
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true); //data geldi
          setCommentList(result) //data
        },
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id, //postid
        kisiId: kisiId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))

  }
  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    })
      
      .catch((err) => console.log(err))
  }
  const checkLikes = () => {
    var likeControl = likes.find((like => like.kisiId === kisiId));
    if (likeControl != null) {
      setLikeId (likeControl.id);
      console.log(likeId);
      setIsLiked(true);
    }

  }

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false; //ilk defa ayağa kalktığını gördüm artık false a çekebilirim.Bir dahaki gelişte oraya girmesin diye
    else
      refreshComments(); //değilse commentleri refresle
  }, [commentList])//herhangi bir değişiklik olduğunda algıla ve refresle //yani birşey kaydettiğimde ekrana kaydettiğimi getir


  useEffect(() => { checkLikes() }, []) //Sadece ilk yüklenme işlemi sonrasında çalışması için kullanılan useEffect()

  return (
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

          title={title}

        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton

            onClick={handleLike}
            aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: 'red' } : null} />

          </IconButton>
          
          {likeCount}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed >
            {
              error ? "error" :
                isLoaded ? commentList.map(comment => (
                  <Comment kisiId={1} kisiName={"KİSİ"} text={comment.text}></Comment>

                )) : "Loading"}
            <CommentForm kisiId={1} kisiName={"KİSİ"} id={id}> </CommentForm>
          
          </Container>
        </Collapse>
      </Card>

    </div>
  )
}
