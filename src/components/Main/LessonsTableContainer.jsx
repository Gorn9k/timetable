import {agGridRu} from "../../assets/agLocalization";
import {AgGridReact} from "ag-grid-react";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import {getTimetableByRoomNumberAndLessonNumberAndDayOfWeek} from "../../api/api";
import {setLessonModalIsOpen, setLessons, setSelectedLesson} from "../../redux/slices/roomSlice";
import {weekdays} from "./ConstantMain";

export const LessonsTableContainer = ({lessonNumber, dayOfWeek, roomNumber}) => {

    const lessons = useSelector(state => state.roomPage.lessons)

    const dispatch = useDispatch()

    const [gridApi, setGridApi] = useState(null)

    const columnDefs = useMemo(() => [
        {headerName: 'Дисциплина', field: 'disciplineName'},
        {headerName: 'Тип занятия', field: 'lessonType'},
        {headerName: 'Преподаватель', field: 'teacherFullName'},
        {headerName: 'Группа', field: 'group'},
        {headerName: 'Подгруппа', field: 'subGroup'},
        {headerName: 'Неделя', field: 'weekType'},
        {headerName: 'С', field: 'startDate'},
        {headerName: 'По', field: 'endDate'}
    ], [])

    useEffect(() => {
        if (lessonNumber && dayOfWeek && roomNumber && gridApi) {
            gridApi.setGridOption('loading', true)
            getTimetableByRoomNumberAndLessonNumberAndDayOfWeek(roomNumber, lessonNumber,
                weekdays.filter(value => value.label === dayOfWeek).shift().value)
                .then(value => value && dispatch(setLessons(value)))
                .finally(() => gridApi.setGridOption('loading', false))
        }

        return () => dispatch(setLessons([]))
    }, [lessonNumber, dayOfWeek, roomNumber, gridApi]);

    return <AgGridReact
        rowData={lessons.length > 0 && lessons}
        columnDefs={columnDefs}
        localeText={agGridRu}
        defaultColDef={{
            resizable: true,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            minWidth: 30,
            flex: 1
        }}
        loadingOverlayComponent={() => <Preloader/>}
        onGridReady={(p) => setGridApi(p.api)}
        animateRows={true}
        onRowDoubleClicked={p => {
            dispatch(setLessonModalIsOpen(true))
            dispatch(setSelectedLesson(p.data))
        }}
    />
}