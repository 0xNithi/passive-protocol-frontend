import React from "react";
import Card from "./Card";
import {Web3Context} from "../contexts/Web3Context";
import DaiContract from "../data/DaiJson.json";
import useInterval from "../hooks/useInterval";

const Pool = ({img, label, contract, coins}) => {
  // Hard code optimize later ❤.
  const {web3} = React.useContext(Web3Context);
  const [daiSmartContract, setDaiSmartContract] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [pending, setPending] = React.useState(0);
  const [stakingBalance, setStakingBalance] = React.useState(0);
  const [TVL, setTVL] = React.useState(0);
  const [coinTvl, setCoinTvl] = React.useState([0, 0, 0, 0, 0]);

  React.useEffect(async () => {
    setDaiSmartContract(
      await new web3.eth.Contract(DaiContract.abi, DaiContract.address)
    );
    if (contract) {
      setPending(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .pendingBalance((await web3.eth.getAccounts())[0])
          .call()
      );
      setStakingBalance(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .stakingBalance((await web3.eth.getAccounts())[0])
          .call()
      );
      setTVL(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .getTVL()
          .call()
      );
    }
    if (coins)
      setCoinTvl([
        await new web3.eth.Contract(
          coins[0].contract.abi,
          coins[0].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[1].contract.abi,
          coins[1].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[2].contract.abi,
          coins[2].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[3].contract.abi,
          coins[3].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[4].contract.abi,
          coins[4].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
      ]);
  }, []);
  useInterval(async () => {
    if (contract) {
      setPending(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .pendingBalance((await web3.eth.getAccounts())[0])
          .call()
      );
      setStakingBalance(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .stakingBalance((await web3.eth.getAccounts())[0])
          .call()
      );
      setTVL(
        await new web3.eth.Contract(contract.abi, contract.address).methods
          .getTVL()
          .call()
      );
    }
    if (coins)
      setCoinTvl([
        await new web3.eth.Contract(
          coins[0].contract.abi,
          coins[0].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[1].contract.abi,
          coins[1].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[2].contract.abi,
          coins[2].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[3].contract.abi,
          coins[3].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
        await new web3.eth.Contract(
          coins[4].contract.abi,
          coins[4].contract.address
        ).methods
          .balanceOf("0xEf5CbAb44b2Cc22737B6Af7b9fefD86A77af26F9")
          .call(),
      ]);
  }, 3000);

  const deposit = async (contract) => {
    const account = (await web3.eth.getAccounts())[0];
    if (
      !parseInt(
        await daiSmartContract.methods
          .allowance(account, contract.address)
          .call()
      )
    ) {
      await daiSmartContract.methods
        .approve(contract.address, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
        .send({from: account});
    }
    await new web3.eth.Contract(contract.abi, contract.address).methods
      .stakeTokens(value.toString())
      .send({from: account});
    setValue(0);
  };

  const withdraw = async (contract) => {
    const account = (await web3.eth.getAccounts())[0];
    await new web3.eth.Contract(contract.abi, contract.address).methods
      .unstakeTokens()
      .send({from: account});
  };

  const harvest = async (contract) => {
    const account = (await web3.eth.getAccounts())[0];
    await new web3.eth.Contract(contract.abi, contract.address).methods
      .harvest()
      .send({from: account});
  };

  const tryAdjust = async (contract) => {
    const account = (await web3.eth.getAccounts())[0];
    await new web3.eth.Contract(contract.abi, contract.address).methods
      .tryAdjust()
      .send({from: account});
  };

  return (
    <Card className="sm:col-start-3 sm:col-end-13 col-span-12 sm:col-span-10">
      <div
        className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 cursor-pointer p-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row">
          <img
            src={`images/invests/${img}.png`}
            alt={img}
            className="w-16 h-12 mr-4"
          />
          {label}
        </div>
        <div>
          {(parseInt(stakingBalance) / Math.pow(10, 18)).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 3,
            }
          )}{" "}
          $ Invested
        </div>
        <div className="truncate">
          {parseInt(TVL).toLocaleString("en-US", {
            minimumFractionDigits: 3,
          })}{" "}
          $ TVL
        </div>
      </div>
      {isOpen && (
        <div className="grid grid-cols-3 gap-4 px-8 pb-8">
          <hr className="col-span-3" />
          <div className="flex flex-col space-y-2">
            Balance
            <input
              type="text"
              placeholder="0.0"
              className="py-4 px-2 border-2 border-gray-200 rounded-md focus:outline-none hover:border-primary focus:border-primary"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="py-1 border-2 border-primary rounded-md text-primary focus:outline-none"
              onClick={() => deposit(contract)}
            >
              Deposit
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            Deposited
            <input
              type="text"
              placeholder="0.0"
              className="py-4 px-2 border-2 border-gray-200 rounded-md focus:outline-none hover:border-primary focus:border-primary"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
            <button
              className="py-1 border-2 border-primary rounded-md text-primary focus:outline-none"
              onClick={() => withdraw(contract)}
            >
              Withdraw
            </button>
          </div>
          <div className="flex flex-col justify-center items-center row-span-2 mt-7 border-2 border-gray-200 rounded-md">
            <div className="p-2 text-3xl">
              {(parseInt(pending) / Math.pow(10, 18)).toLocaleString("en-US", {
                minimumFractionDigits: 3,
              })}
            </div>
            <button
              className="w-1/2 border-2 border-primary rounded-md text-primary focus:outline-none"
              onClick={() => harvest(contract)}
            >
              Harvest
            </button>
          </div>
          <table>
            {coins.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="text-right">
                  {(parseInt(coinTvl[index]) / Math.pow(10, 18)).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 3,
                    }
                  )}{" "}
                  %
                </td>
              </tr>
            ))}
          </table>
          <button
            className="border-2 border-primary rounded-md text-primary focus:outline-none"
            onClick={() => tryAdjust(contract)}
          >
            Adjust Port
          </button>
        </div>
      )}
    </Card>
  );
};

export default Pool;
