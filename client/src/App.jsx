
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Input from './pages/Input';
import Info from './pages/Info';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center' theme='light' />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/update/:id" element={<Input />} />
        <Route path="/view/:id" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
