import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/login';
import AuthProvider from './contexts/AuthContext';
import { CreateUserComponent } from './pages/Features/CreateUser';
import { HomePage } from './pages/Features/HomePage';
import { HeaderComponent } from './pages/Features/HeaderComponent';
import { FriendInfoComponent } from './pages/Features/FriendInfoComponent';
import { FriendCreate } from './pages/Features/FillOutFriend';
import { FriendEdit } from './pages/Features/UpdateUser';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/create/account" element={<CreateUserComponent />}></Route>
              <Route path="/home"  element={<HeaderComponent />}></Route>
              <Route path="/home/:id" element={<HomePage />}></Route>
              <Route path="/friend/:id" element={<FriendInfoComponent />}></Route>
              <Route path='/fill-out/:id' element={<FriendCreate />}></Route>
              <Route path='/update-info/:id' element={<FriendEdit />}></Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
}

export default App;
