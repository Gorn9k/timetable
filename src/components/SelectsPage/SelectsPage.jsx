import {DepartmentSelectContainer} from "./Selects/DepartmentSelectContainer";
import {FormEducationSelectContainer} from "./Selects/FormEducationSelectContainer";
import {SemesterSelectContainer} from "./Selects/SemesterSelectContainer";
import {EducationYearSelectContainer} from "./Selects/EducationYearSelectContainer";
import {TimetableButtonContainer} from "./TimetableButtonContainer";

export const SelectsPage = () => {

    const baseUrl = `${process.env.REACT_APP_BASE_URL}`

    const generateTimetableUrls = (departmentName, educationForm, semesterName, learnYear) => {
        const isValid = departmentName && educationForm && semesterName && learnYear
        return [
            `${baseUrl}${process.env.REACT_APP_LOAD_URL}${isValid ? '?' : ''}${new URLSearchParams(
                {
                    departmentName,
                    educationForm,
                    semesterName,
                    learnYear
                }
            )}`,
            `${baseUrl}${process.env.REACT_APP_TIMETABLE_URL}`,
            `${baseUrl}${process.env.REACT_APP_TEACHER_SCHEDULE_URL}`,
            `${baseUrl}${process.env.REACT_APP_GROUP_SCHEDULE_URL}`
        ]
    }

    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;

    const width = Math.floor(screenWidth / 2);
    const height = Math.floor(screenHeight / 2);

    const positions = [
        {left: 0, top: 0},
        {left: width, top: 0},
        {left: 0, top: height},
        {left: width, top: height}
    ];

    const openTimetable = (timetableUrls) => {
        timetableUrls.forEach((url, index) => {
            const {left, top} = positions[index];
            window.open(
                url,
                '_blank',
                `popup, width=${width - 12},height=${height - 80},left=${left},top=${top},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
            );
        })
    }

    return <>
        <DepartmentSelectContainer/>
        <FormEducationSelectContainer/>
        <SemesterSelectContainer/>
        <EducationYearSelectContainer/>
        <TimetableButtonContainer generateTimetableUrls={generateTimetableUrls} openTimetable={openTimetable}/>
    </>
}