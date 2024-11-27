import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";

import { ConfirmRidePage } from "./pages/ConfirmRidePage/ConfirmRidePage";
import { EstimateRidePage } from "./pages/EstimateRidePage";
import { RideHistoryPage } from "./pages/RideHistoryPage/RideHistoryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<EstimateRidePage />} />
            <Route path="confirm" element={<ConfirmRidePage />} />
            <Route path="rides" element={<RideHistoryPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
