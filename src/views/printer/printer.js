import React, { useRef } from "react";
import "./printer.css";
import { useState } from "react";
import { useEffect } from "react";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";

function Printer() {
  const [barcodeStringArr, setBarcodeStringArr] = useState([""]);
  const componentRef = useRef();

  const handleOnChange = (event, index) => {
    const newBarcodeStringArr = [...barcodeStringArr];
    newBarcodeStringArr[index] = event.target.value;
    setBarcodeStringArr(newBarcodeStringArr);
  };
  const handleAddCodebarInput = (event) => {
    if (event.key === "Enter") {
      setBarcodeStringArr([...barcodeStringArr, ""]);
    }
  };
  const handleDeleteCodebarInput = (index) => {
    const newBarcodeStringArr = [...barcodeStringArr];
    newBarcodeStringArr.splice(index, 1);
    setBarcodeStringArr(newBarcodeStringArr);
  };
  useEffect(() => {
    document.addEventListener("keypress", handleAddCodebarInput);
    return () => {
      document.removeEventListener("keypress", handleAddCodebarInput);
    };
  }, [barcodeStringArr]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //console.log(barcodeStringArr);
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
        <div
          ref={componentRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%", // Ensure the container spans the entire width
            boxSizing: "border-box", // Include padding and border in the width
          }}
        >
          <div className="barcode-generate">
            {barcodeStringArr &&
              barcodeStringArr.length > 0 &&
              barcodeStringArr.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: "calc(33.333% - 20px)", // Adjust for padding
                    padding: "10px",
                    boxSizing: "border-box", // Include padding in the width calculation
                  }}
                >
                  <Barcode value={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Printer;
