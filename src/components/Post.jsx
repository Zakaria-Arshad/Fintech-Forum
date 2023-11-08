import { React, useState } from 'react';
import supabase from '../supabaseClient';

function Post() {
    const { id } = useParams(); // will come from routing link
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
    
    // need to wrap with a Link to with more info about the post after setting up router
    return (
        <>
        
        <div>
            <p>Post title: {postInfo.title}</p>
            <p>Number of comments: {commentNum}</p>
            <p>Number of upvotes: {postInfo.upvotes}</p>
            <p>Post created at: {postInfo.created_at}</p>
        </div>
        </>
    )
}

export default Post