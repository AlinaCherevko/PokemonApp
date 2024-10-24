import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PageDetails from "./pages/PageDetails/PageDetails";
import Page2 from "./pages/Page2/Page2";
import Page3 from "./pages/Page3/Page3";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/scroll" element={<Page2 />} />
        <Route path="/virtualized-list" element={<Page3 />} />
        <Route path="/details" element={<PageDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
