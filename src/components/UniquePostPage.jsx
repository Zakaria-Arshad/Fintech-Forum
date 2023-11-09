import { React, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SubmitCommentForm from './SubmitCommentForm';

function UniquePostPage() {
    
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState(null) // just one post, so null
    const [commentInfo, setCommentInfo] = useState([]) // will be multiple comments, thus array 
    const [triggerFetch, setTriggerFetch] = useState(false)
    const [upvote, setUpvote] = useState(false)
    const navigate = useNavigate();

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

    // triggers on updates to Comments and Upvotes
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
    
        async function deletePost() {
            const { data, error } = await supabase
            .from('posts')
            .delete()
            .match({ id: id });
        
            if (error) {
            console.log('Error deleting post:', error);
            } else {
            console.log('Post deleted successfully:', data);
            navigate('/'); // navigate home after deleting post
            }
        }
      

    // need to add Post creation and deletion
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
        <button onClick={deletePost}>Delete</button>
        <Link to={`/posts/update/${id}`}>Edit</Link> 
        <SubmitCommentForm id={id} onCommentSubmit={handleNewComment}></SubmitCommentForm>
        <div>
            {commentInfo ? (
                <>
                    {commentInfo.map((comment, index) => (
                        <div key={comment.id}> 
                        <p>{comment.comment_text}</p>
                        <p>{comment.created_at}</p>
                        </div>
                    ))}
                </>
            ) : null
            }
        </div>
        </>
    );
}

export default UniquePostPage;