// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    AggregatorV3Interface internal wldUsdPriceFeed;
    AggregatorV3Interface internal ethUsdPriceFeed;
    IERC20 public wldToken;

    address payable public owner;
    address private constant ethPoolAddress = 0xC8fa881b898FA1177c0E7e615AabE61dbBc84508;

    constructor(address _wldTokenAddress, address _wldUsdPriceFeedAddress, address _ethUsdPriceFeedAddress) {
        owner = payable(msg.sender);
        wldToken = IERC20(_wldTokenAddress);
        wldUsdPriceFeed = AggregatorV3Interface(_wldUsdPriceFeedAddress);
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeedAddress);
    }

    function getLatestPrice(AggregatorV3Interface priceFeed) private view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function swapWldToEth(uint256 wldAmount) public {
        require(wldToken.balanceOf(msg.sender) >= wldAmount, "Insufficient WLD balance");
        
        // WLDとETHのUSD価格を取得
        int wldUsdPrice = getLatestPrice(wldUsdPriceFeed);
        int ethUsdPrice = getLatestPrice(ethUsdPriceFeed);

        // ETHの量を計算
        uint256 ethAmount = (uint256(wldUsdPrice) * wldAmount) / uint256(ethUsdPrice);

        // WLDトークンをコントラクトに転送
        require(wldToken.transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");

        // ETHをユーザーに送信
        (bool sent, ) = msg.sender.call{value: ethAmount}("");
        require(sent, "Failed to send ETH");

        // イベントを発行するなど、追加のステップをここに含めることができます
    }

    // コントラクトにETHを預けるためのフォールバック関数
    receive() external payable {}

    // コントラクトのETH残高をオーナーに引き出す関数
    function withdrawEth() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        owner.transfer(address(this).balance);
    }
}
