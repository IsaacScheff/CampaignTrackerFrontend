import React from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import WorldList from "./WorldList";


const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
        </nav>
        <main>
          <WorldList />
        </main>
      </div>
    </Router>
  );
};

// class App extends Component {
//     constructor(props) {
//       super(props);
//       this.state = { apiResponse: "" };
//     }
//     callAPI() {
//       fetch("http://localhost:1337/testAPI")
//         .then(res => res.text())
//         .then(res => this.setState({ apiResponse: res }));
//     }
//     componentDidMount() {
//       this.callAPI();
//     }
  
//     render() {
//       return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <p className="App-intro">
//               {this.state.apiResponse}
//             </p>
//           </header>
//         </div>
//       );
//     }
//   }

export default Routes;