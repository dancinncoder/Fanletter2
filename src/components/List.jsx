import React from 'react'
import {styled} from "styled-components";
import uuid from 'react-uuid';
import userIcon from '../assets/user-icon.png';
import { Link, useParams } from 'react-router-dom';


const ListArea = styled.div`
  border: 1px solid black;
  width: 450px;
  height: 400px;
  margin: 50px 25px 50px 25px;
  overflow-y: scroll;
`;

const Letter = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
  background-color: #e9e9e9;
  margin: 20px;
  padding: 10px;
  gap: 5px;
  height: 180px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.02);
    background-color: #acacac;
  }
`;

const Message = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
`;

const UserIcon = styled.img`
  align-self: start;
  margin: 20px;
  width: 50px;
`;

function List({letters, setLetters}) {
  return (
    <ListArea>
      {letters.map((letter)=>{
        return(
          <Letter
            key={uuid()}
            to={`/letter-details/${letter.id}`}
            state={{userName : letter.userName
            , createdAt : letter.createdAt
            , wroteTo : letter.wroteTo
            , message : letter.message
            }}>
            <UserIcon src={userIcon} alt="User Icon"/>
            <div>
              <h3>{letter.userName}</h3>
              <p>{letter.createdAt}</p>
              <span>To...{letter.wroteTo},&nbsp;</span>
              <Message>{letter.message}</Message>
              <p>{uuid()}</p>
            </div>
          </Letter>
        );
      })}
    </ListArea>
  )
}

export default List