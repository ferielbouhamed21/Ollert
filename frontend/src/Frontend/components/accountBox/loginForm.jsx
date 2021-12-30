
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

export function LoginForm(props) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const { switchToSignup } = useContext(AccountContext);
  const handleLogin = async (event) => {
    event.preventDefault();
        if (user.email && user.password){
            axios.post('/api/users/login', user).then((response) => {
                const data = response.data;
                if (data.user) {
                    navigate('/home');
                    window.location.reload();
                } else {
                    console.log(data);
                }
            });
    }
}
const onFormChange = (event) => {
  let users = user;
  users[event.target.name] = event.target.value;
  setUser(users);
}
  return (
    <BoxContainer>
      <FormContainer onChange={onFormChange}>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={9} />
      <MutedLink href="#"></MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onSubmit={handleLogin}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
