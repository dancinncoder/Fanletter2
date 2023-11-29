import GlobalStyle from 'GlobalStyle';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { setIsAuthorized } from "redux/modules/auth";
import { useDispatch, useSelector } from 'react-redux';

function Auth() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
    nickname: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const idValidation = (id) => {
    if (inputValue.id.length > 10){
      return alert("Please enter a id of 10 characters or less.");
    }
  }

  const passwordValidation = (password) => {
    if(inputValue.password.length > 15){
      return alert("Please enter a password of 15 characters or less.");
    }
  }

  const nicknameValidation = (nickname) => {
    if(inputValue.nickname.length > 10){
      return alert("Please enter a password of 10 characters or less.");
    }
  }

  const typeId = (event) => {
    const myId = event.target.value;
    setInputValue({...inputValue, id: myId});
    idValidation(myId);
  }

  const typePassword = (event) => {
    const myPassword = event.target.value;
    setInputValue({...inputValue, password: myPassword});
    passwordValidation(myPassword);
  }

  const typeNickname = (event) => {
    const myNickname = event.target.value;
    setInputValue({...inputValue, nickname: myNickname});
    nicknameValidation(myNickname);
  }

  const goToSignUpMode = () => {
    setIsSigningUp(!isSigningUp);
    setInputValue({
      id: '',
      password: '',
      nickname: '',
    })
  }

  const authorizationSwitch = (event) => {
    event.preventDefault();
    finalInputValidation();
  }

  const finalInputValidation = () => {
    const idLength = inputValue.id.length;
    const passwordLength = inputValue.password.length;
    const nicknameLength = inputValue.nickname.length;
    if(isSigningUp){
      if(idLength === 0 || passwordLength === 0 || nicknameLength === 0){
        alert("There is an unentered value.");
      } else if (idLength < 4 || passwordLength < 4){
        if(idLength < 4){alert("A id should be more than 4 characters");}
          else if(passwordLength < 15){alert("A passwrod should be more than 4 characters");}
          else if(nicknameLength == 0){alert("A nickname should be more than 1 character");}
      } else {
        alert("Your account has been successfully created! Please sign in.");
        setIsSigningUp(false);
        setInputValue({
          id: '',
          password: '',
          nickname: '',
        })
      }
    } else {
      if(idLength === 0 || passwordLength === 0){
        alert("There is an unentered value.");
      } else if (idLength < 4 || passwordLength < 4){
        if(idLength < 4){alert("A id should be more than 4 characters");}
          else if(passwordLength < 4){alert("A passwrod should be more than 4 characters");}
      } else {
        alert("Welcome!");
        dispatch(setIsAuthorized(auth));
        // console.log('로그인 애프터', auth);
        // console.log('!',dispatch(setIsAuthorized(true)));
        navigate('/');
      }
    }
  }

        console.log('로그여부', auth);
  return (
    <OuterFrame>
      <GlobalStyle />
      <AuthBox>
        {isSigningUp? (<AuthBoxTitle>Create Account</AuthBoxTitle> 
        ) : ( <AuthBoxTitle>Sign In</AuthBoxTitle> )}
        {/* 로그인 여부: {String(dispatch(setIsAuthorized))} */}
        {isSigningUp? (
          <CreateAccountInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={(e)=> typeId(e)} value={inputValue.id} type='text' placeholder='id'/>
            <input onChange={(e) => typePassword(e)} value={inputValue.password} type='password' placeholder='password'/>
            <input onChange={(e)=>typeNickname(e)} value={inputValue.nickname} type='text' placeholder='nickname'/>
            <SignUpBtn>Create Account</SignUpBtn>
            {/* <button onClick={()=>{setIsSigningUp(!isSigningUp)}}>Already our memeber? Log In</button> */}
            <button onClick={goToSignUpMode}>Already our memeber? Log In</button>
          </CreateAccountInputSubmitContainer>
        ) : (
          <SignInInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={(e)=> typeId(e)} value={inputValue.id} type='text' placeholder='id'/>
            <input onChange={(e) => typePassword(e)} value={inputValue.password} type='password' placeholder='password'/>
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