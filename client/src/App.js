import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//apollo-client:
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SessionProvider from './utils/SessionContext.js';
import Auth from './utils/auth';

//components:
import NavBar from './components/NavBar';
import Footer from './components/Footer';
//We probably don't need to import this, but it's nice to have a clean list for reference
import NewCampaign from './components/CampaignForm';

//pages:
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Campaign from './pages/Campaign';
import SingleCampaign from './pages/SingleCampaign';
import Dungeon from './pages/Dungeon';
import SingleDungeon from './pages/SingleDungeon';
import Creatures from './pages/Creatures';




const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Router>
          <div className="App">
            <NavBar />
            {!Auth.loggedIn()
              ?
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/landingpage" element={<Login />} />
                <Route path="/campaigns" element={<Login />} />
                <Route path="/campaigns/:id" element={<Login />} />
                {/* <Route path="/campaigns/new" element={<Login/>} /> */}
                <Route path="/dungeons" element={<Login />} />
                <Route path="/dungeons/:id" element={<Login />} />
                {/* If we want, we could have the single component and all components (like room vs. all rooms) pages use the same page, and just render a different component into them. Since we'll probably have some shared elements between them. But doing them as separate pages is just as good if that's easier. */}
                {/* <Route path="/rooms" element={<Login />} />
              <Route path="/rooms/:id" element={<Login />} /> */}
                <Route path="/creatures" element={<Login />} />
              </Routes>
              :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/landingpage" element={<LandingPage />} />
                <Route path="/campaigns" element={<Campaign />} />
                <Route path="/campaigns/:id" element={<SingleCampaign />} />
                {/* <Route path="/campaigns/new" element={<NewCampaign/>} /> */}
                <Route path="/dungeons" element={<Dungeon />} />
                <Route path="/dungeons/:id" element={<SingleDungeon />} />
                {/* If we want, we could have the single component and all components (like room vs. all rooms) pages use the same page, and just render a different component into them. Since we'll probably have some shared elements between them. But doing them as separate pages is just as good if that's easier. */}
                {/* <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<SingleRoom />} /> */}
                <Route path="/creatures" element={<Creatures />} />
                {/* <Route path="/creatures/:id" element={<SingleCreature />} /> */}
                <Route path="*" element={<Home />} />
              </Routes>
            }
            <Footer />
          </div>
        </Router>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default App;
