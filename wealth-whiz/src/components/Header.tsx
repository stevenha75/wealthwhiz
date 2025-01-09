import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    console.log('Header rendered'); // Debugging log
    return (
        <div className="header">
            <h1 className="logo">Budget</h1>
            <div className="links">
                <a href = '/'> Home</a>
                <a href = '/budget'> Budget</a>
                <a href = '/'> Profile</a>
            </div>
        </div>
    );
};

export default Header;