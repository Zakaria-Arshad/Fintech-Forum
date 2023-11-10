import { React, useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import Post from './Post';
import "../HomeFeedPage.css"

function HomeFeedPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        let { data: posts, error } = await supabase
          .from('posts')
          .select(`
            *,
            comments:comments(post_id) (
              id
            )
          `)
          .order('created_at', { ascending: false });
      
        if (error) {
          console.log('Error', error);
        } else {
          // Here we map over the posts and count the comments manually
          const postsWithCommentCount = posts.map(post => ({
            ...post,
            commentsCount: post.comments.length // Assuming 'comments' is an array of related records
          }));
          setPosts(postsWithCommentCount);
        }
      };
      
    // useEffect for when a new post is added
    useEffect(() => {
        fetchPosts();
    }, [])

    const sort = (sort_type) => {
      let sortedPosts; 
    
      switch (sort_type) {
        case "upvotes":
          sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes); // Descending order
          setPosts(sortedPosts);
          break;
        case "time":
          sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Descending order
          setPosts(sortedPosts);
          break;
        default:
      }
    };

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // called when input changes
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value); // this triggers a re-render, which causes filteredPosts to be called
    };
    
    return (
        <>
        <div className="sort-and-search-container">
          <div className="search-container">
          <input type="text" value={searchTerm} placeholder="Search by title" onChange={handleSearchChange} className="search-bar"/>
          </div>
        <div className="sort-buttons">
          <button className="sort-by-upvotes-button" type="button" onClick={() => sort("upvotes")}>Order by Upvotes</button>
          <button className="sort-by-time-button" type="button" onClick={() => sort("time")}>Order by Time</button>
        </div>
        </div>
          <div className="post-feed">
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <Post id={post.id} /> 
              </div>
            ))}
          </div>
        </>
      );
}
export default HomeFeedPage;