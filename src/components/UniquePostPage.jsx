import { React, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useParams } from 'react-router-dom';
import SubmitCommentForm from './SubmitCommentForm';

function UniquePostPage(){
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState(null) // just one post, so null
    const [commentInfo, setCommentInfo] = useState([]) // will be multiple comments, thus array 
    const [triggerFetch, setTriggerFetch] = useState(false)
    const [upvote, setUpvote] = useState(false)
    // still need to fetch comment amount

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

    useEffect(() => {

        fetchPost();
        fetchComments();

    }, [id, triggerFetch, upvote])

    // handleNewComment is passed to SubmitCommentForm
    const handleNewComment = () => {
        setTriggerFetch(prev => !prev); 
    };

    const upvoteUpdate = async() => {
        const upvotes = postInfo.upvotes + 1
        const {data, error} = await supabase
        .from('posts')
        .update(
            {
                upvotes: upvotes
            })
        .match({
            id: postInfo.id
        })
        if (error){
            console.log("Error: ", error)
        } else {
        setUpvote(prev => !prev);
        }
    }

    return (
        <>
        <div>
            {postInfo ? (
                <>
                    <p>Post title: {postInfo.title}</p>
                    <p>Post content: {postInfo.content}</p>
                    <p>Post image: {postInfo.image ? (<img src={postInfo.image}></img>) : (null)}</p>
                    <p>Number of upvotes: {postInfo.upvotes}</p>
                    <p>Number of comments: {commentInfo.length}</p>
                    <p>Post created at: {postInfo.created_at}</p>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
        <button onClick={upvoteUpdate}>Upvote</button>
        <SubmitCommentForm id={id} onCommentSubmit={handleNewComment}></SubmitCommentForm>
        <div>
            {commentInfo ? (
                <>
                    {commentInfo.map((comment) =>
                    <>
                        <p>{comment.comment_text}</p>
                        <p>{comment.created_at}</p>
                    </> 
                    )
                    }
                </>
            ) : null
            }
        </div>
        </>
    );
}

export default UniquePostPage;