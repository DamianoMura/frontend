import DefaultLayout from "./layouts/DefaultLayout";
import DetailTrip from "./pages/DetailTrip";
import HomePage from "./pages/HomePage";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips/:id" element={<DetailTrip />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
