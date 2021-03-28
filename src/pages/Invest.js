import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Pool from "../components/Pool";
import Soon from "../components/Soon";
import {Web3Context} from "../contexts/Web3Context";
import Farm1Contract from "../data/Farm1Json.json";
import BtcContract from "../data/BtcJson.json";
import EthContract from "../data/EthJson.json";
import BnbContract from "../data/BnbJson.json";
import UsdtContract from "../data/UsdtJson.json";
import XrpContract from "../data/XrpJson.json";

const pools = [
  {
    label: "Top 5 Crypto",
    img: "Top5Cryptos",
    contract: Farm1Contract,
    coins: [
      {name: "BTC", contract: BtcContract},
      {name: "ETH", contract: EthContract},
      {name: "BNB", contract: BnbContract},
      {name: "USDT", contract: UsdtContract},
      {name: "XRP", contract: XrpContract},
    ],
  },
];
const soons = [{label: "Top 5 Defi", img: "Top5Defi"}];

const Invest = () => {
  // Hard code optimize later ❤.
  const {web3} = React.useContext(Web3Context);
  const [tvl, setTvl] = React.useState(0);

  React.useEffect(async () => {
    setTvl(
      parseInt(
        await new web3.eth.Contract(
          Farm1Contract.abi,
          Farm1Contract.address
        ).methods
          .getTVL()
          .call()
      )
    );
  }, []);

  return (
    <Layout>
      <Card className="sm:col-start-10 sm:col-end-13 col-span-12 sm:col-span-2 text-center p-8">
        <div className="font-bold">Total Value Locked</div>
        <div className="text-primary text-3xl truncate">
          {tvl.toLocaleString("en-US", {
            minimumFractionDigits: 3,
          })}{" "}
          $
        </div>
      </Card>
      {pools.map((item, index) => (
        <Pool
          img={item.img}
          label={item.label}
          contract={item?.contract}
          coins={item.coins}
          key={index}
        />
      ))}
      {soons.map((item, index) => (
        <Soon img={item.img} label={item.label} key={index} />
      ))}
    </Layout>
  );
};

export default Invest;
