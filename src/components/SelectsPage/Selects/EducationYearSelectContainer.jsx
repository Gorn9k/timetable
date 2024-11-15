import Select from "react-select";
import {useDispatch} from "react-redux";
import {setLearnYear} from "../../../redux/slices/loadSlice";

export const EducationYearSelectContainer = ({learnYear}) => {
    const educationYears = [
        {
            value: '2024-2025',
            label: '2024-2025-й учебный год'
        }
    ]

    const dispatch = useDispatch();

    return <Select placeholder={'Выберите учебный год'}
                   options={educationYears}
                   defaultValue={learnYear ? {
                       value: `${learnYear}`,
                       label: `${learnYear}-й учебный год`
                   } : undefined}
                   isClearable={true}
                   onChange={(e) => (e && dispatch(setLearnYear(e.value))) || dispatch(setLearnYear(null))}/>
}