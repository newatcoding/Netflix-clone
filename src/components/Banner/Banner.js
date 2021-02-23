import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from "../../axios";
import requests from "../../Requests";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
import { findNonSerializableValue } from '@reduxjs/toolkit';
function Banner(){
    const [movie,setMovie] =useState([]);
    const [trailerUrl,setTrailerUrl]=useState('');

    const style={backgroundColor:trailerUrl!='' && `rgba(0,0,0,0.4)`}
    useEffect(()=>{
        async function fetchData(){
            const request= await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()* request.data.results.length-1)
                ]
            );
            return request;
        }
        fetchData();
    },[]);
   
    function truncate(string, n){
        return string?.length > n ? string.substr(0,n-1) + '...':string;
    }

    const opts ={
        height:"390",
        width:"50%",
        playerVars:{
            autoplay:1,
        },
    };

    const handleClick =(movieName) =>{
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movieName)
            .then((url) => {
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((err) => console.log(err));
        }
    }
    return (
        <header 
            className="banner" 
            style={{
                backgroundSize:"cover",
                backgroundPosition:"center center" ,
                backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              
                            
        }}>
         
        <div style={style}
            className="banner_contents">
                <h1 className="banner_title"> 
                    {movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner_buttons">
                    <button onClick={()=>handleClick(movie.name || movie.title || movie.orginal_name)} className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview,150)}
                    
                </h1>
            </div>
            
        {trailerUrl  !="" && <YouTube className="banner_video" videoId={trailerUrl} opts={opts} />}
         
          
          <div className="banner--fadeBottom"/>
          
        </header>
    );
}

export default Banner;