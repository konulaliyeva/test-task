import React, {useState, useCallback } from "react";
import debounce from "lodash.debounce";

function App() {
  const [result, setResult] = useState([]);

  const requestFunc = async (value) => {
    try {
      const data = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${value}`
      );
      let response = await data.json();
      setResult(response);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (event) => {
    requestFunc(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div className="App">
      <input
        onChange={debouncedChangeHandler}
        style={{ margin: "20px", padding: "10px 20px" }}
      />
      {result.map((item) => {
        return (
          <div key={item.id} style={{ margin: "20px" }}>
            <img src={item.url} widt="400" height="400" />
          </div>
        );
      })}
    </div>
  );
}

export default App;