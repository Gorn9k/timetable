import Select from "react-select";
import {useEffect, useState} from "react";
import {getDepartments} from "../../../api/api";

export const DepartmentSelectContainer = () => {

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments()
            .then(departments => setDepartments(departments.map(department => (
                {
                    value: department.id,
                    label: `Кафедра ${department.shortName}`
                }
            ))));
    }, []);

    return <Select placeholder={'Выберите кафедру'}
                   isClearable={true}
                   options={departments}
                   onChange={(e) => e && console.log(`Вы выбрали ${e.label}`)}/>
}