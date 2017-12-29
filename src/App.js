import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {

  state = {
      response: false,
      endpoint: "http://127.0.0.1:4000",
      gainers: false
    }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on("topGainerList", data => this.setState({ gainers: data }));

  }

  render() {
    const { response } = this.state;

    const topGainers = this.state.gainers ? this.state.gainers.map(gainer => {
      return(
              <tr key={gainer.symbol}>
                <td>
                  {gainer.symbol}
                </td>
                <td>
                  {gainer.companyName}
                </td>
              </tr>
      );
    }) : "Loading...";


    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Latest Price : {response.latestPrice}
            </p>
          : <p>Loading...</p>}
        <br/>
        <h3>Top Gainers</h3>
        <table>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
          </tr>

            {topGainers}
          
        </table>
      </div>
    );
  }
}
export default App;
