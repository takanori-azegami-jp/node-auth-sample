import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="App-Sidebar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Sidebar;
