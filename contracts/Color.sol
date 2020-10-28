// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "./ERC721.sol";

contract Color is ERC721 {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() public ERC721("Color", "COR") {}

    function mint(string memory _color) public {
        // Require unique color
        require(!_colorExists[_color]);

        // Color - add it
        colors.push(_color);
        uint256 _id = colors.length;

        // Call the _mint function
        _mint(msg.sender, _id);

        // Color - track it
        _colorExists[_color] = true;
    }
}
