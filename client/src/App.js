import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//apollo-client:
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//components:
import NavBar from './components/NavBar';
import Footer from './components/Footer';

//pages:
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Campaign from './pages/Campaign';
import Dungeon from './pages/Dungeon';
import Creatures from './pages/Creatures';



const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/landingpage" element={<LandingPage/>} />
        <Route path="/campaigns" element={<Campaign/>} />
        <Route path="/dungeons" element={<Dungeon/>} />
        <Route path="/creatures" element={<Creatures/>} />
      </Routes>
     <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
