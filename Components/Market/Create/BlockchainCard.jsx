import React from "react";

const BlockchainCard = ({ name, image }) => {
  return (
    <div className="widget-coins-item flex items-center">
      <img src={`assets/images/box-icon/coin-${image}.png`} alt={name} />
      <p>
        <a>{name}</a>
      </p>
    </div>
  );
};

export default BlockchainCard;
