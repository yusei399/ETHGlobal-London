// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract RateRecorder {
    AggregatorV3Interface internal wldUsdPriceFeed;
    AggregatorV3Interface internal ethUsdPriceFeed;

    uint256 public wldEthRate; // WLDとETHのレート

    constructor() {
        wldUsdPriceFeed = AggregatorV3Interface(0xC3D7ba4234995543188278E51837F1C27b89E331);
        ethUsdPriceFeed = AggregatorV3Interface(0x61Ec26aA57019C486B10502285c5A3D4A4750AD7);
        wldEthRate = 0; // 初期値は0
    }

    // WLDとETHのレートを更新する関数
    function updateWldEthRate() public {
        int wldUsdPrice = getLatestPrice(wldUsdPriceFeed);
        int ethUsdPrice = getLatestPrice(ethUsdPriceFeed);

        // 新しいレートを計算して設定
        wldEthRate = (uint256(wldUsdPrice) * 1e18) / uint256(ethUsdPrice);
    }

    // 最新の価格を取得する内部関数
    function getLatestPrice(AggregatorV3Interface priceFeed) private view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    // WLDとETHのレートを更新し、更新されたレートを返す関数
    function updateAndGetWldEthRate() public returns (uint256) {
        updateWldEthRate(); // レートを更新
        return wldEthRate; // 更新されたレートを返す
    }
}
