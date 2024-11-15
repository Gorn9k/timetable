import {agGridRu} from "../../assets/agLocalization";
import {AgGridReact} from "ag-grid-react";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";

export const LessonsTableContainer = ({lessonNumber, dayOfWeek, roomNumber}) => {

    const lessons = useSelector(state => state.roomPage.lessons)

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
        if (gridApi) {
            gridApi.setGridOption('loading', true)
            setTimeout(() => gridApi.setGridOption('loading', false), 2000)
        }
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
    />
}