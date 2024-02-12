import React from "react";
import './header.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { fireauth } from '../../firebase/firebase.utils';
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon";

const Header = ({ currentUser }) =>(
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className='logo' />
        </Link>
        <div className="options">
            <Link className="option" to='/shop'>SHOP</Link>
            <Link className="option" to='/shop'>CONTACT</Link>
        
            {
                currentUser ?
                (<div className="option" onClick={() => fireauth.signOut()}>SING OUT</div>)
                :
                (<Link className="option" to='/signin'>SING IN</Link>)
            }

            <CartIcon />

        </div>
    </div>
)

const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);