import React from 'react';
import Post from '../Post/Post';
import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import PostForm from '../Post/PostForm';

export default function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false) ;//data geldi mi gelmedi mi
    const [postList, setPostList] = useState([]); //data bunun içine dolacak

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true); //data geldi
                    setPostList(result) //data
                },

                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => { // refreshPosts() u çağırdığımızda burası çalışır
        refreshPosts()
    }, [postList])//herhangi bir değişiklik olduğunda algıla ve refresle //yani birşey kaydettiğimde ekrana kaydettiğimi getirir


    if (error) //en başta null olarak gönderildiği için buraya girmez parametre error olduğunda girer
    {
        return <div>  Error !!! </div>;
    } else if (!isLoaded) //data henüz gelemdiyse
    {
        return <div>Loading... </div>;

    }
    else {
        return (


            
            <Container fixed  sx={{ rowLength: 100, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", backgroundColor: '#f0f5ff', height: '100vh' }}>
                <PostForm kisiId={1} kisiName={"ddd"} refreshPosts={refreshPosts} />

                {postList.map(post => (
                    <Post likes={post.postLikes} id={post.id} kisiId={post.kisiId} kisiName={post.kisiName} title={post.title} text={post.text} > </Post> //gelen her bir datayı post componenti olarak renderlar

                ))}
                {/* <Box sx={{ display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",backgroundColor:'#cfe8fc', height:'100vh'}} /> */}
                {/* {postList.map(post => (
                    <Post title= {post.title}  text={post.text}></Post> //gelen her bir datayı post componenti olarak renderlar
                    
                ))} */}
            </Container>



        );
    }
}

