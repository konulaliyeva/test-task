import React, { useState } from "react";
import { useRef } from "react";

function debounce(callback, ms = 500) {
  let timerId = null;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(callback, ms);
  };
}
function App(props) {
  const [result, setResult] = useState([]);
  const inputRef = useRef(null);

  const requestFunc = async () => {
    try {
      const data = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${inputRef.current.value}`
      );

      let response = await data.json();

      setResult(response);
    } catch (err) {
      console.log(err);
    }

  };
  const handleChangeInput = () => {   

    debounce (function () {
   console.log('value' + inputRef.current.value)
     requestFunc(test );
    })}


    
  return (
    <div className="App">
      <input onChange={handleChangeInput} ref={inputRef} />
      {result.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.url} widt="400" height="400" />
          </div>
        );
      })}
    </div>
  );
}

// Log to console

export default App;
