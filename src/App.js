import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Search from './pages/Search/Search';
import VideoDetails from './pages/VideoDetails/VideoDetails';
import ChannelDetails from './pages/ChannelDetails/ChannelDetails';
import { useEffect } from 'react';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/subscriptions' element={<Home />} />
          <Route path='/library' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/videodetails' element={<VideoDetails />} />
          <Route path='/channeldetails' element={<ChannelDetails />} />
        </Routes>
    </div>
  );
}

export default App;
