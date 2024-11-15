import {agGridRu} from "../../assets/agLocalization";
import {AgGridReact} from "ag-grid-react";
import React, {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Preloader from "../Preloader/Preloader";

export const LessonsTableContainer = ({lessonNumber, dayOfWeek, roomNumber}) => {

    const lessons = useSelector(state => state.roomPage.lessons)

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

    }, [lessonNumber, dayOfWeek, roomNumber]);

    return <div className={'ag-theme-quartz'} style={{
        height: "600px",
        width: "auto",
    }}>
        <AgGridReact
            rowData={lessons}
            columnDefs={columnDefs}
            localeText={agGridRu}
            defaultColDef={{
                resizable: true,
                wrapHeaderText: true,
                autoHeaderHeight: true,
                minWidth: 30,
                flex: 1
            }}
            loadingOverlayComponent={<Preloader/>}
            animateRows={true}
        ></AgGridReact>
    </div>
}