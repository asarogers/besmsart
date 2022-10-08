
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Join from './frontend/pages/JoinAAdvantage'
import Login from './frontend/pages/Starter'
import Guest from './frontend/pages/Guest'


export default function App() {

  return (
    < >
      <Routes>
        {/*Whenever you need a new page/url, you must use router to direct the user down the path*/}
        {/* The basic syntax is  call Route, give it a path, set element equal to the page you want to use from import statement*/}
        <Route path='/Join' element={<Join />} />
        <Route path='/' element={<Login />} />
        <Route path="/Guest" element={<Guest />} />
      </Routes>
    </>
  );
}


