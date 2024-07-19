import { useState } from 'react';
function TeacherHome() {

    const [itemsDisplayed, setItemsDisplayed] = useState("");

    const handleDisplayed = (value: string) => {
        setItemsDisplayed(value);
    }

    return (
        <div>

            <div>
                Selector for things managed (classrooms, students)

                <input type="radio" name="items_displayed" id="classrooms" value="Classrooms" onChange={() => { handleDisplayed("classrooms")}}>Classrooms</input>
                <input type="radio" name="items_displayed" id="students" value="Students" onChange={() => { handleDisplayed("students") }}>Students</input>
                <input type="radio" name="items_displayed" id="tests" value="Tests" onChange={() => { handleDisplayed("tests") }}>Tests</input>
            </div>

            <div>
                List of currently selected things (buttons to edit and delete)
                Should now be showing: {itemsDisplayed}
            </div>

            <div>
            create new thing button
            </div>

        </div>
    );
}

export default TeacherHome;