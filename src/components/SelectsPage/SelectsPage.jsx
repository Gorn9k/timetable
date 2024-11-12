import {DepartmentSelectContainer} from "./Selects/DepartmentSelectContainer";
import {FormEducationSelectContainer} from "./Selects/FormEducationSelectContainer";
import {SemesterSelectContainer} from "./Selects/SemesterSelectContainer";
import {EducationYearSelectContainer} from "./Selects/EducationYearSelectContainer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setIsCloseTimetable} from "../../redux/slices/loadSlice";

export const SelectsPage = () => {

    const departmentName = useSelector(state => state.loadPage.departmentName)
    const educationForm = useSelector(state => state.loadPage.educationForm)
    const semesterName = useSelector(state => state.loadPage.semesterName)
    const learnYear = useSelector(state => state.loadPage.learnYear)

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            `${baseUrl}${process.env.REACT_APP_TEACHER_SCHEDULE_URL}`,
            `${baseUrl}${process.env.REACT_APP_GROUP_SCHEDULE_URL}`
        ]
    }

    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;

    const width = Math.floor(screenWidth / 2);
    const height = Math.floor(screenHeight / 2);

    const positions = [
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
        <DepartmentSelectContainer departmentName={departmentName}/>
        <FormEducationSelectContainer educationForm={educationForm}/>
        <SemesterSelectContainer semesterName={semesterName}/>
        <EducationYearSelectContainer learnYear={learnYear}/>
        <button disabled={!(departmentName && educationForm && semesterName && learnYear)} onClick={() => {
            dispatch(setIsCloseTimetable(false))
            openTimetable(generateTimetableUrls(departmentName, educationForm, semesterName, learnYear))
            navigate('/timetable')
        }}>
            Развернуть диспетчерскую
        </button>
    </>
}