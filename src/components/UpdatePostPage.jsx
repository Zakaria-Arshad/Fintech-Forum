import { React, useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

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
                <input 
                    type="text"
                    placeholder="Edit Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <input 
                    type="text"
                    placeholder="Edit Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>
                </input>
                <input 
                    type="text"
                    placeholder="Edit Image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}>
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdatePostPage;