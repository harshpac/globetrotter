import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ChallengePage from './ChallengePage';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/challenge" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}
