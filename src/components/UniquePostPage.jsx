import { React, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useParams } from 'react-router-dom';


function UniquePostPage(){
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState(null) // just one post, so null
    const [commentInfo, setCommentInfo] = useState([]) // will be multiple comments, thus array 
    // still need to fetch comment amount

    useEffect(() => {
        console.log(id)
        const fetchPost = async () => {
            const {data, error} = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

            if (error) {
                console.error('Error fetching post: ', error);
            } else {
                setPostInfo(data);
            }
        }

        const fetchComments = async () => {
            const {data, error} = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", id);

            if (error) {
                console.error('Error fetching post: ', error);
            } else {
                setCommentInfo(data);
            }
        }

        fetchPost();
        fetchComments();

    }, [id])

    return (
        <>
        <div>
            {postInfo ? (
                <>
                    <p>Post title: {postInfo.title}</p>
                    <p>Post content: {postInfo.content}</p>
                    <p>Post image: {postInfo.image ? (<img src={postInfo.image}></img>) : (null)}</p>
                    <p>Number of upvotes: {postInfo.upvotes}</p>
                    <p>Post created at: {postInfo.created_at}</p>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
        <div>

        </div>
        </>
    );
}

export default UniquePostPage;