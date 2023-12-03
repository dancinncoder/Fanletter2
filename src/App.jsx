import Router from "shared/Router";
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from "react-redux"
import store from "redux/config/configStore";
//


function App() {

  const [letters, setLetters] = useState([]);


  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;