import React from "react";
import './form.scss';
import SignIn from "../../components/sign-in/sign-in";
import Signup from "../../components/sign-up/sign-up";

const Form = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <Signup />
    </div>
)

export default Form;