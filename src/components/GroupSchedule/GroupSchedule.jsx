import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getGroupSchedule} from "../../api/schedule-api";
import {broadcastChannel} from "../../store";
import {setGroupSchedule} from "../../redux/slices/groupScheduleSlice";

export const GroupSchedule = () => {

    const isCloseTimetable = useSelector(state => state.loadPage.isCloseTimetable)

    const groupName = useSelector(state => state.loadPage.groupName);

    const Body = ({groupName}) => {

        const groupSchedule = useSelector(state => state.groupSchedulePage.groupSchedule);
        const dispatch = useDispatch();

        useEffect(() => {
            groupName && getGroupSchedule(groupName)
                .then(value => value && dispatch(setGroupSchedule(value)))
        }, [groupName]);

        return groupName && groupSchedule.map(lesson => {
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
                <td className={'td'}>{lesson.teacherFio}</td>
            </tr>
        })
    }

    if (isCloseTimetable) {
        broadcastChannel.close()
        window.close()
        return
    }

    return <>
        <div>{groupName && groupName}</div>
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
            <Body groupName={groupName && groupName}/>
            </tbody>
        </table>
    </>
}