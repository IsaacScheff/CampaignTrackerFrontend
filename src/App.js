import React, { Component } from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import logo from './logo.svg';
import './App.css';

import store from './store'
import Routes from './components/Routes'


render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
//   }
//   callAPI() {
//     fetch("http://localhost:1337/testAPI")
//       .then(res => res.text())
//       .then(res => this.setState({ apiResponse: res }));
//   }
//   componentDidMount() {
//     this.callAPI();
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p className="App-intro">
//             {this.state.apiResponse}
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

//export default App;
