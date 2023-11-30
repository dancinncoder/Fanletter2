import GlobalStyle from 'GlobalStyle';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { setIsAuthorized } from "redux/modules/auth";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

  const signUpCommunication = async() => {
    try {
      const response = await axios.post("https://moneyfulpublicpolicy.co.kr/register", {
        id: inputValue.id,
        password: inputValue.password,
        nickname: inputValue.nickname,
        }
      );
      console.log('response',response);
      if(response.data.message === "회원가입 완료"){
          alert("Your account has been successfully created! Please sign in!");
          setIsSigningUp(false);
          setInputValue({
            id: '',
            password: '',
            nickname: '',
        });
      }
    } catch(error) {
      console.error("회원가입중오류발생", error);
      if(axios.isAxiosError(error) && error.response?.status === 409){
        console.log("이미 존재하는 id 입니다.");
        alert("The user ID that already exists.");
      }
    }
  }

  const signInCommunication = async() => {
    try{
      const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login", {
        id: inputValue.id,
        password: inputValue.password,
        }
      );
      if(response.data.success === true){
        alert("Welcome!");
        dispatch(setIsAuthorized(auth));
        navigate('/');
      }
    } catch(error){
      console.error("로그인중오류발생", error);
      if(axios.isAxiosError(error) && error.response?.status == 401){
        console.log("존재하지 않는 유저입니다.");
        alert("This account doesn't exist. Please try again.");
        setInputValue({
          id: '',
          password: '',
      });
      }
    }
  }

  const finalInputValidation = () => {
    const idLength = inputValue.id.length;
    const passwordLength = inputValue.password.length;
    const nicknameLength = inputValue.nickname.length;
    //회원가입
    if(isSigningUp){
      if(idLength === 0 || passwordLength === 0 || nicknameLength === 0){
        alert("There is an unentered value.");
      } else if (idLength < 4 || passwordLength < 4){
        if(idLength < 4){alert("A id should be more than 4 characters");}
          else if(passwordLength < 15){alert("A passwrod should be more than 4 characters");}
          else if(nicknameLength == 0){alert("A nickname should be more than 1 character");}
      } else {
        signUpCommunication();
      }
    //로그인
    } else {
      if(idLength === 0 || passwordLength === 0){
        alert("There is an unentered value.");
      } else if (idLength < 4 || passwordLength < 4){
        if(idLength < 4){alert("A id should be more than 4 characters");}
          else if(passwordLength < 4){alert("A passwrod should be more than 4 characters");}
      } else {
        signInCommunication();
        // alert("Welcome!");
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
        {isSigningUp? (
          <CreateAccountInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={(e)=> typeId(e)} value={inputValue.id} type='text' placeholder='id'/>
            <input onChange={(e) => typePassword(e)} value={inputValue.password} type='password' placeholder='password'/>
            <input onChange={(e)=>typeNickname(e)} value={inputValue.nickname} type='text' placeholder='nickname'/>
            <SignUpBtn>Create Account</SignUpBtn>
            <button onClick={goToSignUpMode}>Already our memeber? Log In</button>
          </CreateAccountInputSubmitContainer>
        ) : (
          <SignInInputSubmitContainer onSubmit={authorizationSwitch}>
            <input onChange={(e)=> typeId(e)} value={inputValue.id} type='text' placeholder='id'/>
            <input onChange={(e) => typePassword(e)} value={inputValue.password} type='password' placeholder='password'/>
            <SignInBtn type="submit">Sign In</SignInBtn> 
            <button onClick={goToSignUpMode}>Are you new here? Create account</button>
          </SignInInputSubmitContainer>
        )
        }

      </AuthBox>
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