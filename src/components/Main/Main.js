import React, {useCallback, useEffect, useState} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App/App.css";
import './Main.css'
import {getExcelScheduleThunk, getExcelScheduleZfThunk,} from "../../redux/actions/mainThunks";
import {useDispatch, useSelector} from "react-redux";
import {Toaster} from "react-hot-toast";
import ExcelModal from "./ExcelModal";
import {useNavigate} from "react-router-dom";
import {setIsCloseTimetable} from "../../redux/slices/loadSlice";
import {RoomsTableContainer} from "./RoomsTableContainer";

const weekComparator = (valueA, valueB) => {
    const week = [
        "Первая",
        "Вторая",
        "Третья",
        "Четвертая",
        "Числитель",
        "Знаменатель",
        "Всегда",
    ];
    const indexA = week.indexOf(valueA);
    const indexB = week.indexOf(valueB);
    return indexA - indexB;
};

let daysForDate = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
];

const Main = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isCloseTimetable = useSelector(state => state.loadPage.isCloseTimetable)
    const faculty = useSelector(state => state.mainPage.faculty)
    const group = useSelector(state => state.mainPage.group)

    const onGridReady = useCallback(
        (params) => {
            // props.getDisciplineThunk();
            // props.getTeacherThunk();
            // props.getGroupThunk();
            // props.getRoomsThunk();
            // setGridApi(params.api);
        },
        [props]
    );

    const [ExcelModalIsOpen, setExcelIsOpen] = useState(false);

    const ExcelOpenModal = () => {
        setExcelIsOpen(true);
    };

    const ExcelCloseModal = () => {
        setExcelIsOpen(false);
    };

    useEffect(() => {
        if (isCloseTimetable)
            navigate('/main')
    }, [isCloseTimetable]);

    if (isCloseTimetable) {
        return
    }

    return <>
        <ExcelModal
            ExcelModalIsOpen={ExcelModalIsOpen}
            ExcelOpenModal={ExcelOpenModal}
            ExcelCloseModal={ExcelCloseModal}
            getExcelScheduleThunk={getExcelScheduleThunk}
            getExcelScheduleZfThunk={getExcelScheduleZfThunk}
            faculty={faculty}
            group={group}
        ></ExcelModal>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{marginTop: "100px"}}
            toastOptions={{
                className: "",
                duration: 5000,
                style: {
                    background: "#434c63",
                    color: "#fff",
                },
                success: {
                    duration: 3000,
                    theme: {
                        primary: "green",
                        secondary: "black",
                    },
                },
            }}
        />
        <div className="controls-container">
            <div className="controls-button">
                <button className="control-button" onClick={() => dispatch(setIsCloseTimetable(true))}>
                    Свернуть диспетчерскую
                </button>
                <button className="control-button" onClick={ExcelOpenModal}>
                    Excel
                </button>
            </div>
        </div>
        <div
            className="ag-theme-quartz"
            style={{
                height: "calc(100vh - 100px)",
                width: "auto",
                margin: "0 20px 0 20px"
            }}
        >
            <RoomsTableContainer/>
        </div>
    </>
}

export default Main