import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import TeacherMain from './Pages/TeacherMain/TeacherMain';
import StudentMain from './Pages/StudentMain/StudentMain';

function App() {

    const [userId, setUserId] = useState({
        id: 0,
        isTeacher: false,
    });

    if (userId.id == 0) {
        return (
            <div>
                <LoginPage setUserId={setUserId} />
            </div>
        );
    } else if (userId.isTeacher == true) {
        return (
            <div>
                <TeacherMain userId={userId} />
            </div>
        );
    } else {
        return (
            <div>
                <StudentMain userId={userId} />
            </div>
        );
    }
}

export default App;