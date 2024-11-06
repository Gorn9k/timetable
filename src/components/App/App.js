import "./App.css";
import {Routes, Route} from "react-router-dom";
import Login from "../login/Login.js";
import Main from "../Main/Main.js";
import AuthProvider from "../../hoc/AuthProvider";
import RequireAuth from "../../hoc/RequireAuth";
import Layout from "../Layout";
import {FirstPage} from "../firstPage/FirstPage";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Login/>}></Route>
                    <Route
                        path="/main"
                        element={
                            <RequireAuth role={["ADMIN"]}>
                                <FirstPage/>
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
