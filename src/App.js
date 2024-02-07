import React from 'react';
import './App.css';
import HomePage from './pages/homepages/homepage';
import ShoPage from './pages/shop/shop';
import { Route, Routes, useParams, useLocation, Link } from 'react-router-dom';

// pagina ejemplo de lista de items
function TopicList() {
  const { pathname } = useLocation();
  console.log(pathname);
  return(
      <div>
        <h1>Topic List</h1>
        <Link to={`${pathname}/233`}>Item 233</Link>
        <Link to={`${pathname}/213`}>Item 213</Link>
      </div>
  )
}

// pagina ejemplo detalle de items
function TopicDetail() {
  let { userId } = useParams();
  return(
      <div>
        <h1>Item Detail</h1>
        <h2>{ userId }</h2>
      </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' Component={HomePage} />
        <Route exact path="/list" Component={TopicList} />
        <Route path="/list/:userId" Component={TopicDetail} />
        <Route path="/shop" Component={ShoPage} />
      </Routes>
    </div>
  );
}

export default App;
