import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Team from "./pages/Team"
import Analytics from "./pages/Analytics"
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import ProgressBar from "./components/ProgressBar";
import { Toaster } from "react-hot-toast";
import Ads from "./pages/Ads";
import SiteConfiguration from "./pages/SiteConfiguration";
import EditAds from "./pages/EditAds";

function App() {

  return (
    <Router>
      {/* utils */}
      <ProgressBar />
      <Toaster />

      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/tables" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/ads/edit" element={<EditAds />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/site" element={<SiteConfiguration />} />
      </Routes>
    </Router>
  )
}

export default App
