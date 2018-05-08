const Service = require('./service.js');

const token = {
  addr: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
  decimals: 18,
};

const user = {
  addr: '',
  pk: '',
};

const config = {
  addressRyxEx: '0x56a20f5c2ad2d88d635783780a7a1ad0e50df492',
  provider: 'https://mainnet.infura.io/GxiQX2aLNKrlJJH0mRZe',
  socketURL: 'https://socket.ryxex.com',
  gasLimit: 150000,
  gasPrice: 4000000000,
};

const service = new Service();
service.init(config)
.then(() => service.waitForMarket(token, user))
.then(() => {
  service.printOrderBook();
  service.printTrades();
  return Promise.all([
    service.getBalance('ETH', user),
    service.getBalance(token, user),
    service.getRyxExBalance('ETH', user),
    service.getRyxExBalance(token, user),
  ]);
})
.then((results) => {
  const [walletETH, walletToken, RyxExETH, RyxExToken] = results;
  console.log(`Balance (wallet, ETH): ${service.toEth(walletETH, 18).toNumber().toFixed(3)}`);
  console.log(`Balance (ED, ETH): ${service.toEth(RyxExETH, 18).toNumber().toFixed(3)}`);
  console.log(`Balance (wallet, token): ${service.toEth(walletToken, token.decimals).toNumber().toFixed(3)}`);
  console.log(`Balance (ED, token): ${service.toEth(RyxExToken, token.decimals).toNumber().toFixed(3)}`);
  const order = service.state.orders.sells[0];
  console.log(`Best available: Sell ${order.ethAvailableVolume.toFixed(3)} @ ${order.price.toFixed(9)}`);
  const desiredAmountBase = 0.001;
  const fraction = Math.min(desiredAmountBase / order.ethAvailableVolumeBase, 1);
  return service.takeOrder(user, order, fraction);
})
.then((result) => {
  console.log(result);
  process.exit();
})
.catch((err) => {
  console.log(err);
  process.exit();
});
