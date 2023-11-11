import { React, useState } from 'react'
import supabase from '../supabaseClient';
import '../SubmitCommentForm.css'

function SubmitCommentForm( {id, onCommentSubmit} ) {
    const [comment, setComment] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(); // prevents browser refresh
        const {data, error} = await supabase
        .from('comments')
        .insert([
            {
                post_id: id,
                comment_text: comment,
            }
        ]);
        if (error){
            console.log("Error: ", error)
        } else {
            console.log("Successful: ", data)
            setComment('');
            onCommentSubmit();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="unique-comment-form">
                <input 
                    className="unique-comment-input"
                    type="text" 
                    placeholder='Write a comment...' 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}>
                </input>
                <button className="unique-comment-button" type="submit">Post Comment</button>
            </form>
        </>
    )
}

export default SubmitCommentForm;