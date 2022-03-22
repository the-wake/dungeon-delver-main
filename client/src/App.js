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

//pages:
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Campaigns from './pages/Campaigns';
import SingleCampaign from './pages/SingleCampaign';
import Areas from './pages/Areas(Unused)';
import SingleArea from './pages/SingleArea';
import Creatures from './pages/Creatures(Unused)';
import SingleRoom from './pages/SingleRoom';


// Log any GraphQL errors or network error that occurred
import { onError } from "@apollo/client/link/error";
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});




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
                <Route path="/*" element={<Login />} />
              </Routes>
              :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/landingpage" element={<LandingPage />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/campaigns/:id" element={<SingleCampaign />} />
                {/* <Route path="/areas" element={<Area />} /> */}
                <Route path="/areas/:id" element={<SingleArea />} />
                {/* <Route path="/rooms" element={<Rooms />} /> */}
                <Route path="/rooms/:id" element={<SingleRoom />} />
                {/* <Route path="/creatures" element={<Creatures />} /> */}
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
