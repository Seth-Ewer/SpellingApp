import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import TeacherHome from './Pages/TeacherHome/TeacherHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import ClassroomEditor from './Pages/Classroom/ClassroomEditor'
import { getUser } from './Pages/LoginPage/LoginPage.slice';
import { useAppSelector } from './State/hooks';
import type { RootState } from './State/store';
import StudentEditor from './Pages/Student/StudentEditor';

function App() {

    return (
        <ClassroomEditor />
    );
}

export default App;