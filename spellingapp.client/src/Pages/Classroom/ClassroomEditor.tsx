import { useGetClassroomQuery } from "./Classroom.api";

function ClassroomEditor() {

    const { data, error, isLoading } = useGetClassroomQuery("3fa85f64-5717-4562-b3fc-2c963f66afa7");


    return (
        <div>
            <div>
                Selector (Students, Tests)
                Data: {JSON.stringify(data)}
                Error: {error?.toString()}
                Loading: {isLoading}
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