import Select from "react-select";
import {useEffect, useState} from "react";
import {getDepartments, unAuthorized} from "../../../api/api";

export const DepartmentSelect = () => {

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