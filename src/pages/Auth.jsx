import GlobalStyle from 'GlobalStyle';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Auth({isAuthorized, setIsAuthorized}) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const usernameValidation = (username) => {
    if (username.length > 10){
      alert("Please enter a username of 10 characters or less.");
      setUsername(username.slice(0, 10)); //10자 이상이면 뒷부분을 잘라내기
    }
  }

  const passwordValidation = (password) => {
    if(password.length > 15){
      alert("Please enter a password of 15 characters or less.");
      setPassword(password.slice(0, 15));
    }
  }

  const nicknameValidation = (nickname) => {
    if(nickname.length > 10){
      alert("Please enter a password of 10 characters or less.");
      setNickname(nickname.slice(0, 10));
    }
  }

  const typeUsername = (event) => {
    const myUsername = event.target.value;
    setUsername(myUsername);
    usernameValidation(myUsername);
  }

  const typePassword = (event) => {
    const myPassword = event.target.value;
    setPassword(myPassword);
    passwordValidation(myPassword);
  }

  const typeNickname = (event) => {
    const myNickname = event.target.value;
    setNickname(myNickname);
    nicknameValidation(myNickname);
  }

  const goToSignUpMode = () => {
    setIsSigningUp(!isSigningUp);
    setUsername("");
    setPassword("");
  }

  const authorizationSwitch = (event) => {
    event.preventDefault();
    finalInputValidation();
  }

  const finalInputValidation = () => {
    const usernameLength = username.length;
    const passwordLength = password.length;
    const nicknameLength = nickname.length;
    if(isSigningUp){
      if(usernameLength === 0 || passwordLength === 0 || nicknameLength === 0){
        alert("There is an unentered value.");
      } else if (usernameLength < 4 || passwordLength < 4){
        if(usernameLength < 4){alert("A username should be more than 4 characters");}
          else if(passwordLength < 15){alert("A passwrod should be more than 4 characters");}
          else if(nicknameLength == 0){alert("A nickname should be more than 1 character");}
      } else {
        alert("Your account has been successfully created! Please sign in.");
        setIsSigningUp(false);
        setUsername("");
        setPassword("");
      }
    } else {
      if(usernameLength === 0 || passwordLength === 0){
        alert("There is an unentered value.");
      } else if (usernameLength < 4 || passwordLength < 4){
        if(usernameLength < 4){alert("A username should be more than 4 characters");}
          else if(passwordLength < 4){alert("A passwrod should be more than 4 characters");}
      } else {
        alert("Welcome!");
        setIsAuthorized(true);
        navigate('/');
      }
    }
  }

  




  return (
    <OuterFrame>
      <GlobalStyle />
      <AuthBox>
        {isSigningUp? (<AuthBoxTitle>Create Account</AuthBoxTitle> 
        ) : ( <AuthBoxTitle>Sign In</AuthBoxTitle> )} 로그인 여부: {String(isAuthorized)}
        {isSigningUp? (
          <CreateAccountInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={typeUsername} value={username} type='text' placeholder='username'/>
            <input onChange={typePassword} value={password} type='password' placeholder='password'/>
            <input onChange={typeNickname} value={nickname} type='text' placeholder='nickname'/>
            <SignUpBtn>Create Account</SignUpBtn>
            {/* <button onClick={()=>{setIsSigningUp(!isSigningUp)}}>Already our memeber? Log In</button> */}
            <button onClick={goToSignUpMode}>Already our memeber? Log In</button>
          </CreateAccountInputSubmitContainer>
        ) : (
          <SignInInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={typeUsername} value={username} type='text' placeholder='username'/>
            <input onChange={typePassword} value={password} type='password' placeholder='password'/>
            <SignInBtn type="submit">Sign In</SignInBtn> 
            {/* <button onClick={()=>{setIsSigningUp(!isSigningUp)}}>Are you new here? Create account</button> */}
            <button onClick={goToSignUpMode}>Are you new here? Create account</button>
          </SignInInputSubmitContainer>
        )
        }

      </AuthBox>
      {/* <button onClick={()=> {
        setIsLogin(true);
        alert("로그인 완료");
      }}>로그인하기</button>
      <button onClick={()=>{
        setIsLogin(false);
        alert("로그아웃 완료");
      }}>로그아웃하기</button> 
      <button onClick={()=> {navigate("/")}}>홈</button>
      <br /> 로그인 여부: {String(isLogin)} */}
    </OuterFrame>
  )
}

export default Auth

const OuterFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #272727;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const AuthBox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 600px;
`;

const AuthBoxTitle = styled.h1`
  color: #272727;
  text-align: center;
  margin: 5px;
`;

const SignInInputSubmitContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 1px solid #272727;
  margin: 20px;
  height: 350px;
  width: 500px;
    input {
      width: 80%;
      height: 40px;
      border: none;
      border-bottom: 1px solid #272727;
    }
    button {
      width: 80%;
      height: 40px;
    }
`;

const CreateAccountInputSubmitContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 1px solid #272727;
  margin: 20px;
  height: 350px;
  width: 500px;
    input {
      width: 80%;
      height: 40px;
      border: none;
      border-bottom: 1px solid #272727;
    }
    button {
      width: 80%;
      height: 40px;
    }
`;

const SignInBtn = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 40px;
`;

const SignUpBtn = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 30px;
`;