import { React, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SubmitCommentForm from './SubmitCommentForm';
import Loading from './Loading';
import '../UniquePostPage.css'

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
        <div className="unique-post-container">
            {postInfo ? (
                <>
                    <p className="unique-comment-date">{new Date(postInfo.created_at).toLocaleString()}</p>
                    <h1 className="unique-post-title">{postInfo.title}</h1>
                    <p className="unique-post-content">{postInfo.content}</p>
                    {postInfo.image_url && (
                        <img className="unique-post-image" src={postInfo.image_url} alt="Post" />
                    )}
                    <div className="unique-post-footer">
                        <div className="unique-post-interactions">
                            <button className="unique-icon-button" onClick={upvoteUpdate}>
                                <i className="unique-icon-thumbs-up"></i>
                            </button>
                            <span>{postInfo.upvotes} Upvotes</span>
                            <span>{commentInfo.length} Comments</span>
                        </div>
                        <div className="unique-post-actions">
                            <button className="unique-icon-button" onClick={deletePost}>
                                <i className="unique-icon-trash"></i>
                            </button>
                            <Link className="unique-icon-button" to={`/posts/update/${id}`}>
                                <i className="unique-icon-edit"></i>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>

        <SubmitCommentForm id={id} onCommentSubmit={handleNewComment}></SubmitCommentForm>
        <div className="unique-comment-feed">
            {commentInfo ? (
                commentInfo.map((comment) => (
                    <div key={comment.id} className="unique-comment-bubble">
                        <p className="unique-comment-date">{new Date(comment.created_at).toLocaleString()}</p>
                        <p className="unique-comment-text">{comment.comment_text}</p>
                    </div>
                ))
            ) : <Loading />
            }
        </div>
        </>
    );
}

export default UniquePostPage;