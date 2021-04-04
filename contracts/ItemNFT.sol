// contracts/ItemNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract ItemNFT is ERC721Upgradeable {
   function initialize() initializer public {
        __ERC721_init("Trade Icons Item NFT", "ICON");    
    }
}