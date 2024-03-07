import React from "react";

const PriceTable = ({ data }) => {
  return (
    <div style={{ whiteSpace: "break-spaces" }}>{data["Tarieven (text)"]}</div>
  );
};

export default PriceTable;
