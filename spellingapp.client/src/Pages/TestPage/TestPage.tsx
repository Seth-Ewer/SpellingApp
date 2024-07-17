import type { RootState } from '../../State/store';
import { useAppDispatch, useAppSelector } from '../../State/hooks';
import { increment, getCurrentScore } from './TestPage.slice';
function TestPage() {
    const dispatch = useAppDispatch();
    dispatch(increment(42));
    const score2 = useAppSelector((state: RootState) => getCurrentScore(state));

    return (
        <div>
        </div>
    );
}

export default TestPage;