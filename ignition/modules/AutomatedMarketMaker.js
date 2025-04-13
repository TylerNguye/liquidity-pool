const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("AutomatedMarketMakerModule", (m) => {
 const amm = m.contract("AutomatedMarketMaker", []);
  return { amm };
});
