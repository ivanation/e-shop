import React from 'react';
import './App.css';
import HomePage from './pages/homepages/homepage';
import ShoPage from './pages/shop/shop';
import { Route, Routes, useParams, useLocation, Link } from 'react-router-dom';
import Header from './components/header/header';
import Form from './pages/form/form';
import { fireauth, createUserProfileDocment } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';


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

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = fireauth.onAuthStateChanged(async userAuth =>{
      setCurrentUser(userAuth)
      if(userAuth){
        const userRef = await createUserProfileDocment(userAuth);
        
        if(userRef){
          setCurrentUser(
            {id:userAuth.uid, ...userRef}
          );
        }

      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  

  render(){
    return (
      <div>
        <Header />
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
