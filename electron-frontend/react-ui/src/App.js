import HomeScreen from "./screens/home";
import AddGuitarScreen from "./screens/addGuitar";
import AddMaintenanceScreen from "./screens/addMaintenance";
import ViewGuitarsScreen from "./screens/viewGuitars";
import ViewMaintenancesScreen from "./screens/viewMaintenances";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/add-guitar" element={<AddGuitarScreen />} />
        <Route path="/add-maintenance" element={<AddMaintenanceScreen />} />
        <Route path="/view-guitars" element={<ViewGuitarsScreen />} />
        <Route path="/view-maintenances" element={<ViewMaintenancesScreen />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
