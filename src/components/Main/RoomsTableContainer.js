import {useDispatch, useSelector} from "react-redux";
import {agGridRu} from "../../assets/agLocalization";
import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import React, {useEffect, useMemo, useRef, useState} from "react";
import {getGroup, getRoomsByFrame} from "../../api/api";
import {LessonsModal} from "./LessonsModal";
import {setModalIsOpen} from "../../redux/slices/roomSlice";
import Preloader from "../Preloader/Preloader";

export const RoomsTableContainer = () => {

    const frame = useSelector(state => state.roomPage.frame)

    const dispatch = useDispatch()

    const gridRef = useRef()

    const [rooms, setRooms] = useState([])
    const [lessonNumber, setLessonNumber] = useState(null)
    const [dayOfWeek, setDayOfWeek] = useState(null)
    const [roomNumber, setRoomNumber] = useState(null)

    const columnDefs = useMemo(() => [
        {headerName: 'Номер аудитории', field: 'roomNumber', minWidth: 130, maxWidth: 130, filter: true, pinned: true},
        {headerName: 'Кафедра', field: 'departmentId', minWidth: 120, maxWidth: 120, filter: true, pinned: true},
        {headerName: 'Количество мест', field: 'seatsNumber', minWidth: 120, maxWidth: 120, filter: true, pinned: true},
        {headerName: 'Тип аудитории', field: 'roomType', minWidth: 130, maxWidth: 130, filter: true, pinned: true},
    ], []);

    const childrenDefs = useMemo(() => [
        {
            headerName: 'Номера занятий',
            children: [
                {headerName: '1'},
                {headerName: '2'},
                {headerName: '3'},
                {headerName: '4'},
                {headerName: '5'},
                {headerName: '6'},
                {headerName: '7'},
            ].map(item => ({
                ...item,
                sortable: false,
                onCellDoubleClicked: p => {
                    dispatch(setModalIsOpen(true))
                    setLessonNumber(item.headerName)
                    setDayOfWeek(p.column.originalParent.originalParent.colGroupDef.headerName)
                    setRoomNumber(p.data.roomNumber)
                }
            }))
        }
    ], [])

    const columnDefsDaysLessons = useMemo(() => [
        {
            headerName: 'Дни недели', children: [
                {headerName: 'Понедельник', children: childrenDefs},
                {headerName: 'Вторник', children: childrenDefs},
                {headerName: 'Среда', children: childrenDefs},
                {headerName: 'Четверг', children: childrenDefs},
                {headerName: 'Пятница', children: childrenDefs},
                {headerName: 'Суббота', children: childrenDefs},
                {headerName: 'Воскресенье', children: childrenDefs}
            ]
        }
    ], []);

    useEffect(() => {
        frame && getRoomsByFrame(frame)
            .then(value => value && setRooms(value))

    }, [frame]);

    return <>
        <LessonsModal
            roomNumber={roomNumber}
            lessonNumber={lessonNumber}
            dayOfWeekHeaderName={dayOfWeek}
        />
        <AgGridReact
            ref={gridRef}
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
            loadingOverlayComponent={() => <Preloader/>}
            onGridReady={(p) => {
                p.api.setGridOption('loading', true)
                setTimeout(() => p.api.setGridOption('loading', false), 5000)
            }}
        />
    </>
}