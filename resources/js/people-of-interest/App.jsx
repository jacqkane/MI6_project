import { useEffect, useState } from "react";
import Main from "./Main";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from './UserContext';
import Register from "./Register";
import Login from "./Login";






function App() {

    const [content, setContent] = useState('');
    const [user, setUser] = useState(null)
    // console.log(user)

    const getUser = async () => {
        const response = await fetch('/api/user');

        if (response.status == 200) {
            const data = await response.json();
            setUser(data);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            <UserContext.Provider value={{ user, setUser, getUser }}>
                <BrowserRouter>
                    <Navigation content={content} setContent={setContent} />

                    <Routes>
                        <Route path="/main" element={<Main content={content} setContent={setContent} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                    </Routes>
                </BrowserRouter >
            </UserContext.Provider>
        </>
    );
}

export default App;