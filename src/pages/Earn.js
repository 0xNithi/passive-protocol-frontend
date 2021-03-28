import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import {Web3Context} from "../contexts/Web3Context";
import Farm1Contract from "../data/Farm1Json.json";

const Earn = () => {
  const {web3} = React.useContext(Web3Context);
  const [pending, setPending] = React.useState(0);
  const [stakingBalance, setStakingBalance] = React.useState(0);

  React.useEffect(async () => {
    setPending(
      await new web3.eth.Contract(
        Farm1Contract.abi,
        Farm1Contract.address
      ).methods
        .pendingBalance((await web3.eth.getAccounts())[0])
        .call()
    );
    setStakingBalance(
      await new web3.eth.Contract(
        Farm1Contract.abi,
        Farm1Contract.address
      ).methods
        .stakingBalance((await web3.eth.getAccounts())[0])
        .call()
    );
  }, []);

  return (
    <Layout>
      <Card
        className="col-span-12 sm:col-span-6 p-8 text-3xl"
        image="images/logo/logo-card.jpg"
      >
        <div className="font-bold">Passive Token Earn</div>
        <div className="p-2 mb-8 rounded text-3xl">
          {(parseInt(pending) / Math.pow(10, 18)).toLocaleString("en-US", {
            minimumFractionDigits: 3,
          })}
        </div>
        <div className="font-bold">Total Invest</div>
        <div className="p-2 rounded text-2xl">
          {(parseInt(stakingBalance) / Math.pow(10, 18)).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 3,
            }
          )}{" "}
          $
        </div>
      </Card>
      <Card className="col-span-12 sm:col-span-4 p-8">
        <div className="font-bold">TVL</div>
        <img src="images/chart.png" alt="chart" />
      </Card>
    </Layout>
  );
};

export default Earn;
