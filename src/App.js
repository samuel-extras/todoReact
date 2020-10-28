import React from "react";

import "./App.css";
import Form from "./todo-input";

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <header className="header"> TODO</header>;
      <Form />
      </div>
    );
  }
}

export default App;
