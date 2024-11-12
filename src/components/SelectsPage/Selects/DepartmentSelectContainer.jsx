import Select from "react-select";
import {useEffect, useState} from "react";
import {getDepartments} from "../../../api/api";
import {useDispatch} from "react-redux";
import {setDepartmentName} from "../../../redux/slices/loadSlice";

export const DepartmentSelectContainer = ({departmentName}) => {

    const [departments, setDepartments] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getDepartments()
            .then(departments => setDepartments(departments.map(department => (
                {
                    value: department.shortName,
                    label: `Кафедра ${department.shortName}`
                }
            ))));
    }, []);

    return <Select placeholder={'Выберите кафедру'}
                   isClearable={true}
                   defaultValue={departmentName ? {
                       value: departmentName,
                       label: `Кафедра ${departmentName}`
                   } : undefined}
                   options={departments}
                   onChange={(e) => (e && dispatch(setDepartmentName(e.value))) || dispatch(setDepartmentName(null))}/>
}