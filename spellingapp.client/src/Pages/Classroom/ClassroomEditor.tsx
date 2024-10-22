import { Classroom } from "./Classroom.slice";
import { getList } from "./Classroom.slice";
import { addClass } from "./Classroom.slice";
import { useSelector } from 'react-redux';

function ClassroomEditor() {

    const tempClassroom =
    {
        id: "",
        name: "New Classroom",
        tests: new Array<string>
    } as Classroom;

    return (
        <div>
            <div>
                {useSelector(getList).map((x) => {
                    return (
                        <div key={x.id}>
                            <p>ID: {x.id}</p>
                            <p>Name: {x.name}</p>
                            <p># of Tests: {x.tests.length}</p>
                        </div>
                    )
                })}
                <button onClick={() => addClass(tempClassroom)}>Click here to add a new thing to the state.</button>
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