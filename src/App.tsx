import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Top from './components/Top';
import About from './components/About';
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
              <Route path="/" element={<Login />} />
              <Route path="/top" element={<Top />} />
              <Route path="/about" element={<About />} />
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
