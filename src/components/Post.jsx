import { React, useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import '../Post.css';


function Post( { id } ) {
    const [postInfo, setPostInfo] = useState(null);
    const [commentNum, setCommentNum] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();
    
            if (error) {
                console.error('Error fetching post: ', error);
            } else {
                setPostInfo(data);
            }
        };
    
        const fetchComments = async () => {
            const { count, error } = await supabase
                .from('comments')
                .select('id', { count: 'exact' })
                .eq('post_id', id);
    
            if (error) {
                console.error('Error fetching comments: ', error);
            } else {
                setCommentNum(count);
            }
        };
    
        fetchPost();
        fetchComments();
    
    }, [id]);
    
    // below makes sure that post info exists before trying to access them
    return (
        <Link to={`/posts/${id}`} className="post-link">
            <div className="post-container">
                {postInfo ? (
                    <>
                        <h2 className="post-title">{postInfo.title}</h2>
                        <p className="post-comments">Comments: {commentNum}</p>
                        <p className="post-upvotes">Upvotes: {postInfo.upvotes}</p>
                        <p className="post-date">Posted: {new Date(postInfo.created_at).toLocaleDateString()}</p>
                    </>
                ) : (
                    <p>Loading post...</p>
                )}
            </div>
        </Link>
    );
    
}

export default Post