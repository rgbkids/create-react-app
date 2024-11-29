import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicApp from './DynamicApp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<DynamicApp />} />
      </Routes>
    </Router>
  );
};

export default App;
