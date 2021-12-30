import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const handleSignUp = async (event) => {
    event.preventDefault();
        if (user.email && user.password && user.password == user.confirm_password && user.username&&user.first_name &&user.last_name){
            axios.post('/api/users/create', user).then((response) => {
                const data = response.data;
                if (data.msg) {
                    
                } else 
console.log(    'Please check all the required fields.' )
            })
    }}

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSignUp}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
