import React, {useRef, useState,useEffect, useMemo} from "react";
import debounce from 'lodash.debounce';

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
 
  const value= inputRef.current.value;

    const debouncedChangeHandler =  useMemo(
      () => debounce(requestFunc(value), 300)
    , []);
  
    useEffect(() => {
      return () => {
        debouncedChangeHandler.cancel();
      }
    }, []);
  return (
    <div className="App">
      <input onChange={debouncedChangeHandler} ref={inputRef} style={{margin:'20px', padding:'10px 20px'}}/>
      {result.map((item) => {
        return (
          <div key={item.id} style={{margin:'20px'}}>
            <img src={item.url} widt="400" height="400" />
          </div>
        );
      })}
    </div>
  );
}

// Log to console

export default App;
