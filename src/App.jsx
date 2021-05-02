import { BrowserRouter as Router, Route } from "react-router-dom";

import ChannelProvider from "./contexts/ChannelProvider";
import ProgramProvider from "./contexts/ProgramProvider";
import UserProvider from "./contexts/UserProvider";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SchedulePage from "./pages/SchedulePage";
import AboutPage from "./pages/AboutPage";
import ChannelPage from "./pages/ChannelPage";
import FavoritePage from "./pages/FavoritePage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <ChannelProvider>
            <ProgramProvider>
              <Navbar />
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/schedule/:channelId"
                component={SchedulePage}
              />
              <Route
                exact
                path="/channels/:channelId"
                component={ChannelPage}
              />
              <Route exact path="/login" component={LogInPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/favorites" component={FavoritePage} />
            </ProgramProvider>
          </ChannelProvider>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
