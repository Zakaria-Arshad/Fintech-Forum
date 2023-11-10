import React from 'react';
import './App.css';
import CreatePostPage from './components/CreatePostPage';
import HomeFeedPage from './components/HomeFeedPage';
import UniquePostPage from './components/UniquePostPage';
import UpdatePostPage from './components/UpdatePostPage';
import appLogo from './images/app-logo-4.png';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <div>
        <img src={appLogo} alt="App Logo" className="app-logo" />
      </div>
      <div className="links">
        <div className="link-container">
        <Link className="home-link" to="/">HOME</Link>
        </div>
        <div className="link-container">
        <Link className="create-post-link" to="/createpost">CREATE POST</Link>
        </div>
      </div>
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

