import { BrowserRouter, Route, Routes } from "react-router";

import { EstimateRidePage } from "./pages/EstimateRidePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<EstimateRidePage />} />
          <Route path="confirm" element={<></>} />
          <Route path="rides" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
