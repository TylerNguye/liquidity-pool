async function main() {
    const amm = await ethers.getContractFactory("AutomatedMarketMaker");
 
    // Start deployment, returning a promise that resolves to a contract object
    const ammDeploy = await amm.deploy("AutomatedMarketMaker");   
    console.log("Contract deployed to address:", ammDeploy.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });