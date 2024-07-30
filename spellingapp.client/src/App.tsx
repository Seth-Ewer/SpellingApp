import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import TeacherHome from './Pages/TeacherHome/TeacherHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import EditClassroom from './Pages/Classroom/EditClassroom'
import { getUser } from './Pages/LoginPage/LoginPage.slice';
import { useAppSelector } from './State/hooks';
import type { RootState } from './State/store';

function App() {

    const currentLogin = useAppSelector((state: RootState) => getUser(state));
    /*
    if (currentLogin == "b:a") {
        return (
            <div>
                <StudentHome />
            </div>
        );
    } else if (currentLogin == "a:b") {
        return (
            <div>
                <TeacherHome/>
            </div>
        );
    } else {
        return (
            <div>
                <LoginPage />
            </div>
        );
    }
    */
    return (
        <EditClassroom/>
    );
}

export default App;