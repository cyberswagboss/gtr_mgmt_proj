import HomeScreen from "./screens/home";
import AddGuitarScreen from "./screens/addGuitar";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/add-guitar" element={<AddGuitarScreen/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
