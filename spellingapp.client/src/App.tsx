import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import TeacherHome from './Pages/Teacher/TeacherHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import ClassroomEditor from './Pages/Classroom/ClassroomEditor'
import StudentEditor from './Pages/Student/StudentEditor';
import Grades from './Pages/Teacher/Grades';
import TestPage from './Pages/TestPage/TestPage';
import { getUser } from './Pages/LoginPage/LoginPage.slice';
import { useAppSelector } from './State/hooks';
import type { RootState } from './State/store';
import { useState } from 'react';

function App() {

    const [pageNav, setPage] = useState("Home");

    //TODO: Add in authentication dependent rendering

    /*
    switch (pageNav) {
        case "Test":
            return(<TestPage />);
            break;
        default:
            return(<StudentHome />);
    }
    */
    switch (pageNav) {
        case "Grades":
            return(<Grades />);
            break;
        default:
            return (<TeacherHome />);
    }

    //return <LoginPage/>;

}

export default App;