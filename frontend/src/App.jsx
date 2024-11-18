import Input from "./routes/Input";
import Homepage from "./routes/Homepage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;