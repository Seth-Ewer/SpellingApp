import type { RootState } from '../../State/store';
import { useAppDispatch, useAppSelector } from '../../State/hooks';
import { setUsername, setPassword, setUser, getUsername, getPassword } from './LoginPage.slice';
function LoginPage() {

    const dispatch = useAppDispatch();

    const username = useAppSelector((state: RootState) => getUsername(state));
    const password = useAppSelector((state: RootState) => getPassword(state));

    const handleSubmit = () => {
        dispatch(setUser(username + ":" + password));
    }

    return (
        <div>
            <label>Username:</label>
            <input onChange={e => dispatch(setUsername(e.target.value))} value={username} ></input>
            <label>Password:</label>
            <input type="password" onChange={e => dispatch(setPassword(e.target.value))} value={password} ></input>
            <button onClick={handleSubmit} ></button>

            <div>Username: {username}</div>
            <div>Password: {password}</div>
        </div>
    );
}

export default LoginPage;