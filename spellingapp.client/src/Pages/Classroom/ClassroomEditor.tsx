import type { RootState } from '../../State/store';
import { Classroom, getList, getLoading, addClass, setLoading } from "./Classroom.slice";
import { useAppDispatch, useAppSelector } from '../../State/hooks';
import { useGetClassroomsQuery } from './Classroom.api';
import { useEffect } from "react";

function ClassroomEditor() {

    const classrooms = useAppSelector((state: RootState) => getList(state));
    const isMakingApiCall = useAppSelector((state: RootState) => getLoading(state));
    const { data, error, isLoading } = useGetClassroomsQuery();

    const DisplayThing = () => {
        return (
            <div>
                {
                    classrooms.map((a) => {
                        return <div>{a.name}</div>
                    })
                }
            </div>
        )
    }

    /*
    const SaveClassrooms = () => {
        return (
            <button onClick={() => useAppDispatch((state: RootState) => setLoading("save"))}>Click here to add a new thing to the state.</button>
        );

    }
                {SaveClassrooms()}
    */

    return (
        <div>
            <div>
                {DisplayThing()}
            </div>

            <div>
                List of thing (buttons to remove or edit)
            </div>

            <div>
                Add thing (SelectorModal to add multiple at once)
            </div>

            <div>
                Button to save (only appears when there are unsaved changes?)
            </div>

            <div>
                conditional UnsavedChangesModal
            </div>
        </div>
    );
}

export default ClassroomEditor;