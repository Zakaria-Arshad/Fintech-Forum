import { React, useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../UpdatePostPage.css' // uses same CSS


function UpdatePostPage() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageURL, setImageURL] = useState('')
    const navigate = useNavigate();

    const fetchPosts = async() => {
        const {data, error} = await supabase
            .from("posts")
            .select("title, content, image_url")
            .eq("id", id)
            .single() // used when expecting one row

            if (error) {
                console.error('Error fetching post: ', error);
            } else {
                setTitle(data.title)
                setContent(data.content)
                setImageURL(data.image_url)
            }
    }

    useEffect (() => {
        fetchPosts();
    }, [id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {data, error} = await supabase
        .from("posts")
        .update({
            title: title,
            content: content,
            image_url: imageURL
        })
        .eq("id", id)

        if (error) {
            console.log("Error occured when updating: ", error)
        } else {
            console.log("Success!")
            navigate(`/posts/${id}`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="create-post-column">
                <input 
                    type="text"
                    className="title-input" 
                    placeholder='Title' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required>
                </input>
                <textarea 
                    type="text"
                    className="content-input" 
                    placeholder='Post Content' 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
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
        </div>
    )
}

export default UpdatePostPage;