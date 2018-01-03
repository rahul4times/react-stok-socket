import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {

  state = {
      response: false,
      endpoint: "http://127.0.0.1:4000",
      temp: false
    }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    console.log('here: ', socket);
    socket.on("FromAPI", data => this.setState({
      response: data }));

      socket.on("SSCApi", data => this.setState({
        temp: data }));

  }
  render() {

    const { response } = this.state;
    const { temp } = this.state;
    console.log('here: ', this.state);
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Latest Price : {response.latestPrice}
            </p>
          : <p>Loading...</p>}
          <p>{temp.latestPrice}</p>
      </div>
    );
  }
}
export default App;
