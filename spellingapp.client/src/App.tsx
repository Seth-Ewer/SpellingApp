import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import TeacherMain from './Pages/TeacherMain/TeacherMain';
import StudentMain from './Pages/StudentMain/StudentMain';
import { getAttempt } from './Pages/LoginPage/LoginPage.slice';
import { useAppSelector } from './State/hooks';
import type { RootState } from './State/store';

function App() {

    const currentLogin = useAppSelector((state: RootState) => getAttempt(state));

    if (currentLogin == "b:a") {
        return (
            <div>
                <StudentMain />
            </div>
        );
    } else if (currentLogin == "a:b") {
        return (
            <div>
                <TeacherMain/>
            </div>
        );
    } else {
        return (
            <div>
                <LoginPage />
            </div>
        );
    }
}

export default App;