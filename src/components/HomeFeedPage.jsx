import { React, useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';

function HomeFeedPage() {
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

    return (
        <>
          <button className="sort-by-upvotes-button" type="button">Order by Upvotes</button>
          <button className="sort-by-time-button" type="button">Order by Time</button>
          <div className="post-feed">
            {posts.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>Upvotes: {post.upvotes}</p>
                <p>Comments: {post.commentsCount}</p>
              </div>
            ))}
          </div>
          <Link to={"/createpost"}>Create Post</Link>
        </>
      );
}
export default HomeFeedPage;