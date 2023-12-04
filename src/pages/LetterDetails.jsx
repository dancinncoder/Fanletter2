import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import GlobalStyle from '../GlobalStyle';
import goHomeBtn2 from '../assets/gohome-icon2.png';
import UserIcon from '../components/UserIcon';
import Header from 'components/Header';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteLetter, __editLetter, __getLetters, deleteLetter, editLetter } from 'redux/modules/letters';

function LetterDetails() {
  const dispatch = useDispatch();
  const letters = useSelector(state=>state.letters);
  const { id } = useParams();
  const { nickname, content, createdAt, wroteTo } = letters && letters.letters.find((item) => item.id === id) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const navigate = useNavigate();

  const deleteLetterHandler = () => {
    if(window.confirm("Are you sure you want to delete the letter?") === true){
      dispatch(__deleteLetter(id));
      alert("your letter has been successfully deleted!");
      navigate("../");
    } else {
      return false;
    }
  }

  const editHandler = () => {
    setIsEditing(!isEditing);
  }

  const editedTypeHandler = (event) => {
    const editedSavedContent = event.target.value;
    setEditedContent(editedSavedContent);
  }

  const editedAddHandler = (event) => {
    event.preventDefault();
    // validation check
    if(content === editedContent){
      alert("There is no any change");
    } else {
      if(window.confirm("Are you sure you want to save the changes?") === true) {
        dispatch(__editLetter({id, editedContent}));
        // dispatch(editLetter({id, editedContent}));
        alert("Your changes has been successfully updated!");
        setIsEditing(false);
      } else {
        return;
      }
    }

  };

  useEffect(()=> {
    dispatch(__getLetters());
  },[dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header/>
      <Main>
        <BtnArea>
          <GoHomeBtn2 src={goHomeBtn2} onClick={()=> {navigate(-1)}}></GoHomeBtn2>
        </BtnArea>
        {isEditing? (
          <>
            <Letter>
              <NicknameAndCreatedAt>
                <UserInfo>
                  <UserIcon />
                  <p>{nickname}</p>
                  </UserInfo>
                  <CreatedAt>{createdAt}</CreatedAt>
              </NicknameAndCreatedAt>
              <WroteTo>To: {wroteTo}</WroteTo>
              <Form onSubmit={editedAddHandler}>
                <Content><Textarea onChange={editedTypeHandler}>{content}</Textarea></Content>
              </Form>
            </Letter>
            <EditBtnArea>
              <Button type="submit" onClick={editedAddHandler} >Save</Button>
              <Button onClick={editHandler} >Cancel</Button>
            </EditBtnArea>
          </>
        ) : (
          <>
            <Letter>
              <NicknameAndCreatedAt>
                <UserInfo>
                <UserIcon />
                  <p>{nickname}</p>
                </UserInfo>
                <CreatedAt>{createdAt}</CreatedAt>
              </NicknameAndCreatedAt>
              <WroteTo>To: {wroteTo}</WroteTo>
              <Content>{content}</Content>
            </Letter>
            <EditBtnArea>
              <Button onClick={editHandler}>Edit</Button>
              <Button onClick={deleteLetterHandler}>Delete</Button>
              <Button onClick={()=> {navigate(-1)}} >Back</Button>
            </EditBtnArea>
          </>
        )}  
      </Main>

    </div>
  );
}

const Letter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  width: 33%;
  height: 400px;
  margin: 0 150px 80px 150px;
  background-color: #f2f2f2;
  color: #000000;
  padding: 10px 50px 10px 50px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #272727;
`;

const GoHomeBtn2 = styled.img`
  /* height: 90vh; */
  /* max-height: 90%; */
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  max-width:99%;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
  transform: scale(1.04);
  }
`;

const BtnArea = styled.div`
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30%;
  height: 90%;
  overflow-y: hidden;
  /* z-index: 0; */
`;

const EditBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: end;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 15%;
  height: 100px;
  background-color: black;
  color: white;
  font-size: 1.3rem;
  border: none;
  display: block;
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: #343434;
  }
  &:first-child {
    bottom: 55%;
  }
  &:nth-child(2){
    bottom: 43%;
  }
  &:nth-child(3){
    bottom: 31%;
  }
`;

export default LetterDetails

const NicknameAndCreatedAt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-self: flex-start;
  padding-right: 15px;
  gap: 20px;
  width: 103%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 800;
`;

const CreatedAt = styled.p`
  font-weight: 600;
`;

const WroteTo = styled.p`
  align-self: flex-start;
  width: 80%;
  padding: 0 5px 5px 5px;
  margin: 0 5px 5px 5px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #e49090;
`;

const Content = styled.p`
  align-self: flex-start;
  width: 93%;
  height: 150px;
  padding: 20px 20px 5px 20px;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: #e5e3e3;
  border-radius: 10px;
`;

const Textarea = styled.textarea`
  border: none;
  background-color: #e5e3e3;
  resize: none;
  overflow-y: hidden;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.2rem;
  font-weight: 400;
  color: #606060;
  height: 128px;
  padding-bottom: 10px;
  width: 100%;
  outline: none;
  padding: 0 0 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
  height: 175px;
  padding: 0px;
  margin: 0;
`;


