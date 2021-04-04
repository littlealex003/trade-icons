// contracts/ItemNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";



contract ItemNFT is ERC721Upgradeable {
   using EnumerableSet for EnumerableSet.UintSet;
   using Counters for Counters.Counter;
   using Strings for uint256;
   Counters.Counter private _tokenIds;
   mapping(address=>EnumerableSet.UintSet) playerItemsMapping;
   mapping(uint256=>uint64) itemTypeIdMapping;

    function name() public view virtual override returns (string memory) {
        return "TradeIcons";
    }

    function symbol() public view virtual override returns (string memory) {
        return "ICON";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = "http://nft.semift.com/";
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, Strings.toString(itemTypeIdMapping[tokenId]),"/",Strings.toString(tokenId)))
            : Strings.toString(tokenId);
    }

    function ownerTokens(address owner) public view returns (string memory) {
       string memory toReturn="";
       for (uint256 index = 0; index < playerItemsMapping[owner].length(); index++) {
          toReturn=string(abi.encodePacked(toReturn, ";", Strings.toString(playerItemsMapping[owner].at(index))));
       }
       return toReturn;
    }

   function mintItem(address owner, uint64 itemType) public returns (uint256)
   {
      _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _mint(owner, newItemId);
      playerItemsMapping[owner].add(newItemId);
      itemTypeIdMapping[newItemId]=itemType;

      return newItemId;
   }
}