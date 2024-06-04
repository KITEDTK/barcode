import "./App.css";
import BarcodeReader from "./views/barcode-reader/readerMachine/barcode-reader";
import Printer from "./views/printer/printer";
import Navigation from "./views/Nav/nav";
import {  Route, Routes } from "react-router-dom";
import { BarcodeWebcamReader } from "./views/barcode-reader/webcam/BarcodeWebcamReader";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
            <Routes>
              <Route exact path="/" element={<BarcodeReader />} />
              <Route exact path="/printer" element={<Printer />} />
              <Route exact path="/reader-webcam" element={<BarcodeWebcamReader/>} />
            </Routes>
      </header>
    </div>
  );
}

export default App;
