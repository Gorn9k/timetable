import Select from "react-select";
import {useDispatch} from "react-redux";
import {setSemesterName} from "../../../redux/slices/loadSlice";

export const SemesterSelectContainer = () => {
    const semesters = [
        {
            value: `осенний семестр`, label: `Осенний семестр`
        },
        {
            value: `весенний семестр`, label: `Весенний семестр`
        }
    ]

    const dispatch = useDispatch();

    return <Select placeholder={'Выберите номер семестра'}
                   options={semesters}
                   isClearable={true}
                   onChange={(e) => e && dispatch(setSemesterName(e.value.split(' ')[0]))}/>
}