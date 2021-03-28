import React from "react";
import Web3 from "web3";

const Web3Context = React.createContext({web3: null});

const Web3ContextProvider = ({children}) => {
  const [web3, setWeb3] = React.useState(null);
  const initWeb3 = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum
          .enable()
          .then(() => {
            resolve(new Web3(window.ethereum));
          })
          .catch((e) => {
            reject(e);
          });
        return;
      }
      if (typeof window.web3 !== "undefined") {
        return resolve(new Web3(window.web3.currentProvider));
      }
      resolve(new Web3("http://localhost:9545"));
    });
  };

  React.useEffect(() => {
    initWeb3()
      .then((_web3) => {
        setWeb3(_web3);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    web3 && (
      <Web3Context.Provider value={{web3}}>{children}</Web3Context.Provider>
    )
  );
};

export {Web3Context, Web3ContextProvider};
