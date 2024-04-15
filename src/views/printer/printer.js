import React, { useRef } from "react";
import "./printer.css";
import { useState } from "react";
import { useEffect } from "react";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import JsBarcode from "jsbarcode";

function Printer() {
  const [barcodeStringArr, setBarcodeStringArr] = useState(["newCodebar"]);
  const componentRef = useRef();
  const barcodeRefs = useRef([]);

  const handleOnChange = (event, index) => {
    const newBarcodeStringArr = [...barcodeStringArr];
    newBarcodeStringArr[index] = event.target.value;
    setBarcodeStringArr(newBarcodeStringArr);
  };
  const handleAddCodebarInput = (event) => {
    if (event.key === "Enter") {
      setBarcodeStringArr([...barcodeStringArr, "newCodebar"]);
    }
  };
  const handleDeleteCodebarInput = (index) => {
    const newBarcodeStringArr = [...barcodeStringArr];
    newBarcodeStringArr.splice(index, 1);
    setBarcodeStringArr(newBarcodeStringArr);
  };
  const generateBarcodes = () => {
    barcodeStringArr.forEach((value, index) => {
      const barcodeValue = value === "" ? "null" : value;
  
      JsBarcode(barcodeRefs.current[index], barcodeValue, {
        format: "CODE128",
        width: 1,
        height: 50,
        displayValue: true,
        margin: 30,
        background: "#dddddd"
      });
    });
    
  };
  const generateBarcode = (barcodeString,index) =>{
    const barcodeStringValue = barcodeString.trim() === "" ? "null" : barcodeString;

    JsBarcode(barcodeRefs.current[index], barcodeStringValue, {
      format: "CODE128",
      width: 2,
      height: 50,
      displayValue: true,
      margin: 30,
      background: "#dddddd"
    });
  }
  useEffect(() => {
    document.addEventListener("keypress", handleAddCodebarInput);
    //generateBarcodes();
    barcodeStringArr.forEach((item,index)=>{
      generateBarcode(item,index);
    })
    return () => {
      document.removeEventListener("keypress", handleAddCodebarInput);
    };
  }, [barcodeStringArr]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div>
        <h1>Barcode generate</h1>
        <strong>import Barcode:</strong>
        <div>Press Enter to add more input</div>
        <div>
          {barcodeStringArr.map((item, index) => (
            <>
              <input
                key={index}
                value={item}
                onChange={(event) => handleOnChange(event, index)}
              />
              <button
                onClick={() => {
                  handleDeleteCodebarInput(index);
                }}
              >
                X
              </button>
              <br />
            </>
          ))}
        </div>
        <div>Codebar Generated</div>
        <div>
          <button onClick={handlePrint}>Print</button>
        </div>
        <div ref={componentRef}  style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%", // Ensure the container spans the entire width
            boxSizing: "border-box", // Include padding and border in the width
          }}>
          {barcodeStringArr && barcodeStringArr.map((value, index) => (
            <>
            <svg
              key={index}
              ref={(ref) => (barcodeRefs.current[index] = ref)}
            ></svg>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Printer;
