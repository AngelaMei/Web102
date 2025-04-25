import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import Card from '../components/Card';

const PopularPost = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        setPosts(props.data);

        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .gt('like', 2)
                .order('like', { ascending: false })
                .limit(5);

            setPosts(data);
        };

        fetchPosts()
    }, [props]);

    return(
        <div className='card-slider'>
            {
                
                posts && posts.length > 0 ?
                posts.map((post) => 
                        <Card 
                            key={post.id}
                            id={post.id} 
                            author={post.author}
                            serie={post.serie}
                            serie_id={post.serie_id}
                            title={post.title}
                            season={post.season}
                            episode={post.episode}
                            created_at={post.created_at}
                            like={post.like}
                            dislike={post.dislike}
                            />          
            ) : <h2>{"No Posts!"}</h2>
            }
        </div>
    )
}

export default PopularPost;