import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes >
          <Route exact path="/create" element={<Create className="bg-white"/>} />
          <Route exact path="/allpost" element={<Read className="bg-white"/>} />
          <Route exact path=":id" element={<Update className="bg-white"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
