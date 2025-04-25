import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import Card from '../components/Card';

const ReadPost = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // start loading

        setPosts(props.data);

        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order(sortBy, { ascending: false });

            setPosts(data);
            setLoading(false); 
        };

        fetchPosts()
    }, [sortBy]);

    return(
        <>
            <div className="sort-chips">
                <button
                    className={sortBy === 'created_at' ? 'chip active' : 'chip'}
                    onClick={() => setSortBy('created_at')}
                >
                    🕒 Creation Time
                </button>
                <button
                    className={sortBy === 'like' ? 'chip active' : 'chip'}
                    onClick={() => setSortBy('like')}
                >
                    👍 Likes
                </button>
            </div>

            <div className='all-posts'>

            {loading ? (
                <div className="loader">Loading posts...</div>
            ) : posts && posts.length > 0 ? (
                posts.map((post) => (
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
                ))
            ) : (
                <h2>No Posts!</h2>
            )}
        </div>
        </>
    )
}

export default ReadPost;