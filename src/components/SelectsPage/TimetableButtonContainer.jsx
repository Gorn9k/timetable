import {useSelector} from "react-redux";

export const TimetableButtonContainer = ({openTimetable, generateTimetableUrls}) => {

    const departmentName = useSelector(state => state.loadPage.departmentName)
    const educationForm = useSelector(state => state.loadPage.educationForm)
    const semesterName = useSelector(state => state.loadPage.semesterName)
    const learnYear = useSelector(state => state.loadPage.learnYear)

    return <button onClick={() => openTimetable(generateTimetableUrls(departmentName, educationForm, semesterName, learnYear))}>
        Развернуть диспетчерскую
    </button>
}