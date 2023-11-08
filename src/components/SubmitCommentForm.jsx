import { React, useState } from 'react'
import supabase from '../supabaseClient';

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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Comment' 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}>
            </input>
            <button type="submit">Post Comment</button>
        </form>
        </>
    )
}

export default SubmitCommentForm;