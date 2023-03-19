import "./App.css";
import Dashboard from "./components/dashboard";
import ViewForm from "./components/leftsection/view-form";
import Login from "./components/login";
import { MyProvider } from "./context/my-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewform" element={<ViewForm />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </div>
  );
}

export default App;
