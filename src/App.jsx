import Router from "shared/Router";
import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux"
import store from "redux/config/configStore";

function App() {

  const [letters, setLetters] = useState([]);

  // 세부정보페이지에서 새로고침하면 데이터가 없다고 오류가 뜨는데 해결방법이 궁금합니다
  // useEffect(()=>{
  //   const lettersData = require("../src/database/fakeData.json");
  //   setLetters(lettersData);
  //   console.log('letters In useEffect',lettersData);
  // },[])

  // useEffect(()=>{
  //   const fetchLettersData = async () => {
  //     try{
  //       const response = await fetch("../database/fakeData.json");
  //       const lettersData = await response.json();
  //       setLetters('lettersData',lettersData);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchLettersData();
  // },[]);



  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;