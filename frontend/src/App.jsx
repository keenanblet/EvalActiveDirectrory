import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListUser from './ListUser.jsx';
import Organigramme from './Organigramme.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListUser />} />
        <Route path="/orga" element={<Organigramme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
