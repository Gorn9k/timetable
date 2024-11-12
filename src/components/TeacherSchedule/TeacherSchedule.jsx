import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTeacherSchedule} from "../../api/schedule-api";
import {broadcastChannel} from "../../store";
import {setTeacherSchedule} from "../../redux/slices/teacherScheduleSlice";

export const TeacherSchedule = () => {

    const isCloseTimetable = useSelector(state => state.loadPage.isCloseTimetable)

    const teacherFio = useSelector(state => state.loadPage.teacherFio);

    const Body = ({teacherFio}) => {

        const teacherSchedule = useSelector(state => state.teacherSchedulePage.teacherSchedule)
        const dispatch = useDispatch();

        useEffect(() => {
            teacherFio && getTeacherSchedule(teacherFio)
                .then(value => value && dispatch(setTeacherSchedule(value)))
        }, [teacherFio]);

        return teacherFio && teacherSchedule.map(lesson => {
            return <tr key={lesson.id}>
                <td className={'td'}>{lesson.lessonDay}</td>
                <td className={'td'}>{lesson.lessonNumber}</td>
                <td className={'td'}>{'-'}</td>
                <td className={'td'}>{lesson.typeClassName}</td>
                <td className={'td'}>{lesson.disciplineName}</td>
                <td className={'td'}>{lesson.subGroup === 0 ? 'Вся группа' : lesson.subGroup}</td>
                <td className={'td'}>{lesson.weekNumber || 'Всегда'}</td>
                <td className={'td'}>{(lesson.numerator && lesson.numerator ? 'Числитель' : 'Знаменатель')
                    || 'Всегда'}</td>
                <td className={'td'}>{`${lesson.frame}-${lesson.location}`}</td>
                <td className={'td'}>{lesson.groupName}</td>
            </tr>
        })
    }

    if (isCloseTimetable) {
        broadcastChannel.close()
        window.close()
        return
    }

    return <>
        <div>{teacherFio && teacherFio.fio}</div>
        <table className={'table'}>
            <thead className={'thead'}>
            <tr>
                <th className={'th'}>День</th>
                <th className={'th'}>Пара</th>
                <th className={'th'}>Время</th>
                <th className={'th'}>Тип занятия</th>
                <th className={'th'}>Дисциплина</th>
                <th className={'th'}>Подгруппа</th>
                <th className={'th'}>Неделя</th>
                <th className={'th'}>Числитель / Знаменатель</th>
                <th className={'th'}>Аудитория</th>
                <th className={'th'}>Преподаватель</th>
            </tr>
            </thead>
            <tbody>
            <Body teacherFio={teacherFio && teacherFio.fio}/>
            </tbody>
        </table>
    </>
}