import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import './createPost.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CreatePost = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [post, setPost] = useState({
        title: "", 
        author: "", 
        serie: "", 
        season: "",
        episode: "",
        description: "",
        serie_id:"",
        img_url: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost( (prev ) => {
            return {
                ...prev,
                [name]: value,
            }
        })

        if (name === 'serie'){
            if (value.length > 2) {
                fetchSeriesSuggestions(value);
            } else {
                setSuggestions([]);
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.autocomplete-wrapper')) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const fetchSeriesSuggestions = async(query) => {
        try{
            const response = await fetch(
                `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`, options);
            const data = await response.json();
            // console.log(data)
            setSuggestions(data.results);
        } catch (error) {
            console.error('Error fetching TV series suggestions:', error);
        }
    }

    const handleSuggestionClick = (series) => {
        console.log("Selected:", series.title || series.name || series.original_name, series.id);
        setPost((prev) => ({ ...prev, serie: series.title || series.name || series.original_name }));
        setPost((prev) => ({...prev, serie_id: series.id}))
        setSuggestions([]);
    };

    const createPost = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('Posts')
            .insert({
                title: post.title, 
                author: post.author, 
                serie: post.serie, 
                season: post.season, 
                episode: post.episode,
                description: post.description,
                serie_id: post.serie_id,
                img_url: post.img_url,
                userId: localStorage.getItem('userId')
            })
            .select();

            if (error) {
                console.error('Insert error:', error);
              } else {
                window.location = "/";
              }
    }

    return(
        <div>
            <h1>Create New Post</h1>
            <form onSubmit={createPost}>

                <label htmlFor="author">Post Author</label>
                <input type="text" id="author" name='author' value={post.author} required onChange={handleChange}/>


                <label htmlFor="serie">TV Series</label>
                <div className="autocomplete-wrapper">
                <input
                    type="text"
                    id="serie"
                    name='serie'
                    value={post.serie}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                    {suggestions.map((series) => (
                        <li key={series.id} onClick={() => handleSuggestionClick(series)}>
                        {series.title || series.name || series.original_name}
                        </li>
                    ))}
                    </ul>
                )}
                </div>

                <label htmlFor="season">Season</label>
                <input type="number" id="season" min="1" name='season' value={post.season} onChange={handleChange} required/>
                

                <label htmlFor="episode">Episode</label>
                <input type="number" id="episode" min="1" name='episode' value={post.episode} onChange={handleChange} required/>
                


                <label htmlFor="title">Post Title</label>
                <input type="text" id="title" name='title' value={post.title} onChange={handleChange} required/>

                <label htmlFor="img_url">Image Url</label>
                <input id="img_url" name='img_url' value={post.img_url} onChange={handleChange}/>
                
                <label htmlFor="description">Description</label>
                <textarea id="description" name='description' value={post.description} onChange={handleChange} required/>
                

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CreatePost;