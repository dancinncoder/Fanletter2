import React from 'react'
import {styled} from "styled-components";
import {useState} from 'react';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLetter } from 'redux/modules/letters';
import { useRef } from 'react';


function FormArea() {
  const dispatch = useDispatch();
  const letters = useSelector(state => state.letters);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [wroteTo, setWroteTo] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("Paul");
  const [createdAt, setCreatedAt] = useState("");
  const [formValue, setFormValue] = useState({
    id: uuid(), userName: userName, createdAt, message: message, wroteTo: selectedCharacter, character: selectedCharacter,
  });
  const userNameHandler = (event) => {
    console.log('username', event.target.value);
    setUserName(event.target.value);
  }
  const messageTypeHandler = (event) => {
    console.log('username', event.target.value);
    setMessage(event.target.value);
  }

  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  useEffect(()=> {
    // GET CURRNET DATE & TIME
    const now = moment();
    // FORMATTING
    const formattedTime = now.format('YY-MM-DD HH:mm:');
    setCreatedAt(formattedTime);
  },[])

  // const userNameRef = useRef(null);
  // useEffect(()=> {
  //   userNameRef.current.focus();
  // })

  // SEND THE DEFAULT VALUE OF SELECTION 'PAUL' FOR THE FIRST TIME WHEN LOADING THE INITIAL SCREEN
   useEffect(()=> {
    setFormValue(selectedCharacter);
    console.log('최초 selected name is :',selectedCharacter);
  },[]);

  // SELECTING OPTION SETTING
  const selectHandler = (event) => {
    const selectedValue = event.target.value;

    // Update selectedCharacter state
    setSelectedCharacter(selectedValue);

    // Update formValue with the selected character
    setFormValue((prevFormValue)=> (
      {...prevFormValue, wroteTo: selectedValue,}
      ))
  }

  // NEW LETTER ADD
  const addHandler = (event) => {
    event.preventDefault();
    const newLetter = {id: uuid(), userName: userName, createdAt: moment().format('YY-MM-DD HH:mm'), message: message, wroteTo: selectedCharacter,
    }
    console.log('입력값으로 만들어진 객체',newLetter);
    const userNameLength = userName.trim().length;
    const messageLength = message.trim().length;

    // validation check
    if (userNameLength === 0 || messageLength === 0) {
      alert("Please fill out the blank");
      return;
    } else if (userNameLength > 20) { 
      alert("Please write your usernmae within 20 characters.");
      return;
    } else if (messageLength > 100) {
      alert("Please write your message within 100 characters.");
      return;
    } else if (/^\s*$/.test(userName) || /^\s*$/.test(message)) {
      alert("Only spaces have been entered.");
      return;
    } else {
      if(window.confirm("Are you sure you want to send the letter?") === true){
        dispatch(addLetter(newLetter));
        // setLetters([...letters, newLetter]);
        alert("Your letter has been successfully sent!");
      } else {
        return false;
      }
      // input box init
        setUserName("");
        setMessage("");
    }
  }

  return (
    <Form onSubmit={addHandler}>
      {console.log("letters at form area", letters)}
      {/* 데이터 들어오는거 확인 */}
      <ToUserName>
        {/* name은 옵션값의 Key 명이 될 이름이다. */}
        To...<select name="wroteTo" value={letters.wroteTo}  onChange={selectHandler}>
          <option value="Paul">Paul</option>
          <option value="Elio">Elio</option>
          <option value="Gatsby">Gatsby</option>
          <option value="Lee">Lee</option>
        </select>
        username: <UserNameInput type="text" value={userName} onChange={userNameHandler} placeholder='max 20 characters'/>
      </ToUserName>
      <MessageBox>
        message: <MessageInput type="text" value={message} onChange={messageTypeHandler} placeholder='max 100 characters'/>
      </MessageBox>
    <SendButton type="submit">Send</SendButton>
  </Form>
  )
 }

 export default FormArea

 const Form = styled.form`
 display: flex;
 flex-direction: column;
 justify-content: center;
 gap: 10px;
 font-size: 1rem;
 font-weight: 600;
 color: #000000;
 //아래가 후
 width: 90%;
 height: 120px;
 border-radius: 20px;
 margin: 20px;
 background-color: #f2f2f2;
 padding: 10px;
`;

const MessageInput = styled.input`
 width: 90%;
 border: none;
`;

const UserNameInput = styled.input`
 width: 100%;
 border: none;
`;

const SendButton = styled.button`
 background-color: white;
 border: 1px solid black;
 height: 40px;
 width: 100%;
 border: none;
 cursor: pointer;
 border-radius: 20px;
 transition: 0.2s ease;
 &:hover {
   background-color: black;
   color: white;
   transform: scale(1.004);
 }
`;

const ToUserName = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items: center;
 width: 85%;
 gap: 10px;
 height: 20px;
 margin: 2px 20px 2px 20px;
`;

const MessageBox = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: start;
 gap: 10px;
 margin: 2px 20px 2px 20px;
`;

