import React, { useState, useEffect } from "react";

function SimpleBarcodeScanner() {
  const [barcodeString, setBarcodeString] = useState("");
  const [barcodeStringArr, setBarcodeStringArr] = useState([]);
  const conditionToBreak = barcodeString.length === 14;
  const handleKeyPress = (event) => {
    setBarcodeString((prevBarcode) => {
      return prevBarcode + event.key;
    });
  };
  useEffect(() => {
    if (conditionToBreak) {
      setBarcodeStringArr([...barcodeStringArr, barcodeString]);
      setBarcodeString(""); // Clear the barcodeString state after adding to the array
    }
  }, [barcodeString, barcodeStringArr]);
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Simple Barcode scanner</h1>
      <strong>Last scanned barcode:</strong>
      {barcodeStringArr.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export default SimpleBarcodeScanner;
