import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Header(){
  const { theme, toggleTheme} = useContext(ThemeContext);

  return (
      <header className="header-container">
        <h1>메모 관리 앱</h1>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>
    );
  }

export default Header;

