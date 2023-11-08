import React from 'react';
import './App.css'
import CreatePostPage from './components/CreatePostPage';
import HomeFeedPage from './components/HomeFeedPage';
import UniquePostPage from './components/UniquePostPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeedPage />}></Route>
        <Route path="/createpost" element={<CreatePostPage />}></Route>
        <Route path="/posts/:id" element={<UniquePostPage />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
