import { React, useState } from 'react';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import "../CreatePostPage.css"


function CreatePostPage(){
    const [postTitle, setPostTitle] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [imageURL, setImageURL] = useState('');

    // handle submit: method for posting the data into our database, and resetting states
    const handleSubmit = async(e) => {
        e.preventDefault(); // prevents browser refresh
        const {data, error} = await supabase
        .from('posts')
        .insert([
            {
                title: postTitle,
                content: bodyText,
                image_url: imageURL
            }
        ]);
        if (error){
            console.log("Error: ", error)
        } else {
            console.log("Successful: ", data)
            setPostTitle('');
            setBodyText('');
            setImageURL('');
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="create-post-column">
                <input 
                    type="text"
                    className="title-input" 
                    placeholder='Title' 
                    value={postTitle} 
                    onChange={(e) => setPostTitle(e.target.value)}
                    required>
                </input>
                <textarea 
                    type="text"
                    className="content-input" 
                    placeholder='Post Content' 
                    value={bodyText} 
                    onChange={(e) => setBodyText(e.target.value)}
                    required>
                </textarea>
                <input 
                    type="text"
                    className="image-input" 
                    placeholder='Image URL' 
                    value={imageURL} 
                    onChange={(e) => setImageURL(e.target.value)}>
                </input>
            </div>
            <button className="submit-create-post" type="submit">Post</button>
        </form>
        </>
    );
}

export default CreatePostPage;