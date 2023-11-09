import React from 'react';
import './App.css';
import CreatePostPage from './components/CreatePostPage';
import HomeFeedPage from './components/HomeFeedPage';
import UniquePostPage from './components/UniquePostPage';
import UpdatePostPage from './components/UpdatePostPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li className="app-title">App Title</li>
        <li className="create-post-link"><Link to="/createpost">Create Post</Link></li>
        <li className="home-link"><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar /> {/* NavBar is included here so it's rendered on every page */}
      <Routes>
        <Route path="/" element={<HomeFeedPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/posts/:id" element={<UniquePostPage />} />
        <Route path="/posts/update/:id" element={<UpdatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;

