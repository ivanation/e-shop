import React from "react";
import './sign-in.scss';
import FormInput from "../form-input/form-input";
import CustomButton from '../custom-button/custom-button';
import { signInWithGoogle, signInEmail } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const {email, password} = this.state;

        try{
            signInEmail(email, password);
            this.setState({email: '', password: ''});
        }catch (error){
            console.log(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and pass</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} label="email" name="email" type="email" value={this.state.email} required />
                    <FormInput handleChange={this.handleChange} label="password" name="password" type="password" value={this.state.password} required />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;