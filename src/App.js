import "./App.css";
import BarcodeReader from "./views/barcode-reader/barcode-reader";
import Printer from "./views/printer/printer";
import Navigation from "./views/Nav/nav";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
            <Routes>
              <Route exact path="/" element={<BarcodeReader />} />
              <Route exact path="/printer" element={<Printer />} />
            </Routes>
      </header>
    </div>
  );
}

export default App;
