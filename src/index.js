import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*

  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    if (isAdminMode) {

      setIsAdminMode(false); 
    }
  }, [isAdminMode]);

  // 관리자 모드로 전환하는 함수
  const switchToAdminMode = () => {
    setIsAdminMode(true);
  };

  return (
    <div>
{ isAdminMode ? <HeaderAdmin /> : <HeaderUser /> }
*/