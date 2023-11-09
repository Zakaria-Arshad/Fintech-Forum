import React from 'react';
import './App.css'
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

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeedPage />}></Route>
        <Route path="/createpost" element={<CreatePostPage />}></Route>
        <Route path="/posts/:id" element={<UniquePostPage />}></Route>
        <Route path="/posts/update/:id" element={<UpdatePostPage />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
