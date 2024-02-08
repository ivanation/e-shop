import React from 'react';
import './App.css';
import HomePage from './pages/homepages/homepage';
import ShoPage from './pages/shop/shop';
import { Route, Routes, useParams, useLocation, Link } from 'react-router-dom';
import Header from './components/header/header';
import Form from './pages/form/form';
import { fireauth } from './firebase/firebase.utils';

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

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = fireauth.onAuthStateChanged(user =>{
      this.setState({currentUser: user});
      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path='/' Component={HomePage} />
          <Route exact path="/list" Component={TopicList} />
          <Route path="/list/:userId" Component={TopicDetail} />
          <Route path="/shop" Component={ShoPage} />
          <Route path="/signin" Component={Form} />
        </Routes>
      </div>
    );
  }

}

export default App;
