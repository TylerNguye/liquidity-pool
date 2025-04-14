async function main() {
    const ContractFactory = await ethers.getContractFactory("AutomatedMarketMaker")
    const contractInstance = await ContractFactory.deploy();
    console.log("AMM deployed to: ", contractInstance.target)
    const ContractFactory2 = await ethers.getContractFactory("Exchange")
    const contractInstance2 = await ContractFactory2.deploy();
    console.log("Exchange deployed to: ", contractInstance2.target)
    const ContractFactory3 = await ethers.getContractFactory("LiquidToken")
    const contractInstance3 = await ContractFactory3.deploy(5000);
    console.log("LiquidToken address is: ", contractInstance3.target);
}

async function deployContract(name) {
    const ContractFactory = await ethers.getContractFactory(name)
    const contractInstance = await ContractFactory.deploy();
    console.log("Contract deployed to: ", contractInstance.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });