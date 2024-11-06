import {DepartmentSelect} from "./selects/DepartmentSelectContainer";
import {FormEducationSelectContainer} from "./selects/FormEducationSelectContainer";
import {SemesterSelectContainer} from "./selects/SemesterSelectContainer";
import {EducationYearSelectContainer} from "./selects/EducationYearSelectContainer";

export const FirstPage = () => {

    return <>
        <DepartmentSelect/>
        <FormEducationSelectContainer/>
        <SemesterSelectContainer/>
        <EducationYearSelectContainer/>
    </>
}