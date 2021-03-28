import React from "react";
import {Web3Context} from "../contexts/Web3Context";

const Header = () => {
  const {web3} = React.useContext(Web3Context);
  const [account, setAccount] = React.useState();

  React.useEffect(async () => {
    setAccount((await web3.eth.getAccounts())[0]);
  }, []);

  return (
    <div className="flex flex-row justify-between py-2 sm:py-6 lg:py-8">
      <div className="flex flex-row">
        <img
          src="images/logo/logo-text.png"
          alt="logo"
          className="h-12 mr-2 hidden lg:block"
        />
        <img
          src="images/logo/logo.png"
          alt="logo"
          className="h-12 mr-2 block lg:hidden"
        />
      </div>
      <button className="flex-none w-48 h-8 px-8 bg-white border-2 border-primary rounded-full truncate focus:outline-none hover:bg-primary hover:text-white">
        {account ? account : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
