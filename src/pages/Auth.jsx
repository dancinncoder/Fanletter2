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

  const signInHandler = (event) => {
    event.preventDefault();
    alert("로그인되었습니다!");
    setIsAuthorized(true);
    navigate('/');
  }

  const signUpHandler = () => {
    alert("Your account has been successfully created! Please sign in!");
    setIsSigningUp(false);
  }

  return (
    <OuterFrame>
      <GlobalStyle />
      <AuthBox>
        {isSigningUp? (<AuthBoxTitle>Create Account</AuthBoxTitle> 
        ) : ( <AuthBoxTitle>Sign In</AuthBoxTitle> )} 로그인 여부: {String(isAuthorized)}
        {isSigningUp? (
          <CreateAccountInputSubmitContainer onSubmit={signUpHandler}>
            <input value={username} type='text' placeholder='username'/>
            <input value={password} type='password' placeholder='password'/>
            <input value={nickname} type='text' placeholder='nickname'/>
            <SignUpBtn>Create Account</SignUpBtn>
            <button onClick={()=>{setIsSigningUp(!isSigningUp)}}>Already our memeber? Log In</button>
          </CreateAccountInputSubmitContainer>
        ) : (
          <SignInInputSubmitContainer onSubmit={signInHandler}>
            <input value={username} type='text' placeholder='username'/>
            <input value={password} type='password' placeholder='password'/>
            <SignInBtn type="submit">Sign In</SignInBtn> 
            <button onClick={()=>{setIsSigningUp(!isSigningUp)}}>Are you new here? Create account</button>
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