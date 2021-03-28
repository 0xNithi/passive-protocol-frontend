import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Web3ContextProvider} from "./contexts/Web3Context";

const Earn = React.lazy(() => import("./pages/Earn"));
const Invest = React.lazy(() => import("./pages/Invest"));
const Governance = React.lazy(() => import("./pages/Governance"));

const App = () => {
  return (
    <Web3ContextProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Earn} />
            <Route exact path="/earn" component={Earn} />
            <Route exact path="/invest" component={Invest} />
            <Route exact path="/governance" component={Governance} />
          </Switch>
        </React.Suspense>
      </Router>
    </Web3ContextProvider>
  );
};

export default App;
