import React from 'react'
import { useNavigate } from 'react-router-dom';

function Auth({isLogin, setIsLogin}) {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=> {
        setIsLogin(true);
        alert("로그인 완료");
      }}>로그인하기</button>
      <button onClick={()=>{
        setIsLogin(false);
        alert("로그아웃 완료");
      }}>로그아웃하기</button> 
      <button onClick={()=> {navigate("/")}}>홈</button>
      <br /> 로그인 여부: {String(isLogin)}
    </div>
  )
}

export default Auth