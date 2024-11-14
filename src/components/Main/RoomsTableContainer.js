import {useSelector} from "react-redux";
import {agGridRu} from "../../assets/agLocalization";
import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import React, {useEffect, useMemo} from "react";
import {getRoomsByFrame} from "../../api/api";

export const RoomsTableContainer = () => {

    const frame = useSelector(state => state.roomPage.frame)

    const [rooms, setRooms] = React.useState([])

    const columnDefs = useMemo(() => [
        {headerName: 'Номер аудитории', field: 'roomNumber', minWidth: 130, maxWidth: 130, filter: true, pinned: true},
        {headerName: 'Кафедра', field: 'departmentId', minWidth: 120, maxWidth: 120, filter: true, pinned: true},
        {headerName: 'Количество мест', field: 'seatsNumber', minWidth: 120, maxWidth: 120, filter: true, pinned: true},
        {headerName: 'Тип аудитории', field: 'roomType', minWidth: 130, maxWidth: 130, filter: true, pinned: true}
    ], []);

    const childrenDefs = useMemo(() => [
        {headerName: '1', field: '1', sortable: false, valueFormatter: p => {console.log(p); return 1}},
        {headerName: '2', field: '2', sortable: false},
        {headerName: '3', field: '3', sortable: false},
        {headerName: '4', field: '4', sortable: false},
        {headerName: '5', field: '5', sortable: false},
        {headerName: '6', field: '6', sortable: false},
        {headerName: '7', field: '7', sortable: false}
    ], [])

    const columnDefsDaysLessons = useMemo(() => [
        {headerName: 'Понедельник', field: '0', children: childrenDefs},
        {headerName: 'Вторник', field: '1', children: childrenDefs},
        {headerName: 'Среда', field: '2', children: childrenDefs},
        {headerName: 'Четверг', field: '3', children: childrenDefs},
        {headerName: 'Пятница', field: '4', children: childrenDefs},
        {headerName: 'Суббота', field: '5', children: childrenDefs},
        {headerName: 'Воскресенье', field: '6', children: childrenDefs}
    ], []);

    useEffect(() => {
        frame && getRoomsByFrame(frame)
            .then(value => value && setRooms(value))
    }, [frame]);

    return <AgGridReact
        rowData={rooms}
        columnDefs={[...columnDefs, ...columnDefsDaysLessons]}
        localeText={agGridRu}
        defaultColDef={{
            resizable: true,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            minWidth: 30,
            flex: 1
        }}
        animateRows={true}
    ></AgGridReact>
}