import {useEffect, useState} from "react";
import {getLoad} from "../../api/load-api";
import {useDispatch, useSelector} from "react-redux";
import {
    setGroupName,
    setLaboratoryHours,
    setLectureHours,
    setPracticeHours,
    setTeacherFio
} from "../../redux/slices/loadSlice";
import {getTeachers} from "../../api/api";
import {useLocation} from "react-router-dom";
import {broadcastChannel} from "../../store";

export const LoadContainer = () => {

    const isCloseTimetable = useSelector(state => state.loadPage.isCloseTimetable)

    const Body = () => {

        const [loads, setLoads] = useState([])
        const lectureHours = useSelector(state => state.loadPage.lectureHours)
        const practiceHours = useSelector(state => state.loadPage.practiceHours)
        const laboratoryHours = useSelector(state => state.loadPage.laboratoryHours)
        const teacherFio = useSelector(state => state.loadPage.teacherFio)
        const groupName = useSelector(state => state.loadPage.groupName)

        const params = new URLSearchParams(useLocation().search)

        const departmentName = params.get('departmentName');
        const educationForm = params.get('educationForm');
        const semesterName = params.get('semesterName');
        const learnYear = params.get('learnYear');

        const validParams = departmentName && educationForm && semesterName && learnYear

        const dispatch = useDispatch();

        useEffect(() => {
            validParams && getLoad(departmentName, educationForm, semesterName, learnYear)
                .then(loads => {
                    loads && getTeachers(loads.map(value => value.teacherId))
                        .then(teachers => {
                            teachers && setLoads(loads.map(value => {
                                const teacher = teachers.find(teacher => teacher.id === value.teacherId)
                                if (teacher) return {...value, teacherFio: teacher.fullName}
                            }))
                        })
                })
        }, []);

        return loads.map(load => {
            return <tr key={load.id}>
                <td className={'td'}>{load.course}</td>
                <td className={'td'}>ФИТиР</td>
                <td className={'td'}>{load.disciplineName}</td>
                <td className={'td'}>{load.lecture + load.practice + load.laboratory}</td>
                <td className={`${lectureHours && lectureHours.id === load.id ? 'selectedTd ' : ''}td`}
                    onClick={() => dispatch(setLectureHours(lectureHours && lectureHours.id === load.id ? null : {
                        id: load.id,
                        hours: load.lecture
                    }))}>
                    {load.lecture}
                </td>
                <td className={`${practiceHours && practiceHours.id === load.id ? 'selectedTd ' : ''}td`}
                    onClick={() => dispatch(setPracticeHours(practiceHours && practiceHours.id === load.id ? null : {
                        id: load.id,
                        hours: load.practice
                    }))}>
                    {load.practice}
                </td>
                <td className={`${laboratoryHours && laboratoryHours.id === load.id ? 'selectedTd ' : ''}td`}
                    onClick={() =>
                        dispatch(setLaboratoryHours(laboratoryHours && laboratoryHours.id === load.id ? null : {
                            id: load.id,
                            hours: load.laboratory
                        }))}>
                    {load.laboratory}
                </td>
                <td className={'td'}>{`${load.group}/${load.studentsCount}`}</td>
                <td className={`${teacherFio && teacherFio.id === load.id ? 'selectedTd ' : ''}td`}
                    onClick={() => {
                        dispatch(setTeacherFio(teacherFio && teacherFio.id === load.id ? null : {id: load.id, fio: load.teacherFio}))
                        dispatch(setGroupName(groupName && groupName.id === load.id ? null : {id: load.id, name: load.group}))
                    }}>
                    {load.teacherFio}
                </td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{'-'}</td>
            </tr>
        })
    }

    if (isCloseTimetable) {
        broadcastChannel.close()
        window.close()
        return
    }

    return <table className={'table'}>
        <thead className={'thead'}>
        <tr>
            <th className={'th'} rowSpan={3}>Курс</th>
            <th className={'th'} rowSpan={3}>Факультет</th>
            <th className={'th'} rowSpan={3}>Наименование дисциплины</th>
            <th className={'th'} rowSpan={3}>Общее число часов в неделю</th>
            <th className={'th'} colSpan={3}>Виды занятий</th>
            <th className={'th'} colSpan={7}>ФИО преподавателей, ведущих занятия, номера групп</th>
            <th className={'th'} rowSpan={3}>Аудитория лекционная с проектором (аудитории на первом этаже)</th>
            <th className={'th'} rowSpan={3}>Примечание (необходимые ауд., лекционная неделя и др.)</th>
        </tr>
        <tr>
            <th className={'th'} rowSpan={2}>Лекц.</th>
            <th className={'th'} rowSpan={2}>Практ.</th>
            <th className={'th'} rowSpan={2}>Лаб.</th>
            <th className={'th'} colSpan={2}>Лекции</th>
            <th className={'th'} colSpan={2}>Практические занятия</th>
            <th className={'th'} colSpan={3}>Лабораторные занятия</th>
        </tr>
        <tr>
            <th className={'th'}>№ группы</th>
            <th className={'th'}>ФИО преподавателя</th>
            <th className={'th'}>№ группы</th>
            <th className={'th'}>ФИО преподавателя</th>
            <th className={'th'}>№ группы</th>
            <th className={'th'}>№ подгруппы</th>
            <th className={'th'}>ФИО преподавателя</th>
        </tr>
        </thead>
        <tbody>
        <Body/>
        </tbody>
    </table>
}