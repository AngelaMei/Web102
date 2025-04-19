import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import Card from '../components/Card';

const ReadPost = (props) => {


    const [posts, setPosts] = useState([]);

    useEffect(() => {

        setPosts(props.data);

        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true });

            setPosts(data);
        };

        fetchPosts()
    }, [props]);

    return(
        <div>
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                    <Card key={post.id} id={post.id} name={post.name} character={post.character} color={post.color}/>          
            ) : <h2>{"No Crewmate!"}</h2>
            }
        </div>
    )
}

export default ReadPost;