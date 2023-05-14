import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contents_Home from './components/Contents_Home';
import Contents_About from './components/Contents_About';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <header className="App-Header">
        <Header />
      </header>
      <Router>
        <main className="App-Main">
          <Sidebar />
          <div className="App-Contents">
            <Routes>
              <Route path="/" element={<Contents_Home />} />
              <Route path="/about" element={<Contents_About />} />
            </Routes>
          </div>
        </main>
      </Router>
      <footer className="App-Footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
