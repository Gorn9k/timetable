import "./App.css";
import {Routes, Route} from "react-router-dom";
import Login from "../login/Login.js";
import Main from "../Main/Main.js";
import AuthProvider from "../../hoc/AuthProvider";
import RequireAuth from "../../hoc/RequireAuth";
import Layout from "../Layout";
import {SelectsPage} from "../SelectsPage/SelectsPage";
import {LoadContainer} from "../Load/LoadContainer";
import {TeacherSchedule} from "../TeacherSchedule/TeacherSchedule";
import {GroupSchedule} from "../GroupSchedule/GroupSchedule";

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
                                <SelectsPage/>
                            </RequireAuth>
                        }
                    />
                </Route>
                <Route path='/load' element={<LoadContainer/>}/>
                <Route path='/timetable' element={<Main/>}/>
                <Route path='/teacher-schedule' element={<TeacherSchedule/>}/>
                <Route path='/group-schedule' element={<GroupSchedule/>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
