import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {setLessonModalIsOpen, setLessonsModalIsOpen} from "../../redux/slices/roomSlice";
import {LessonsTableContainer} from "./LessonsTableContainer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {setIsCloseTimetable} from "../../redux/slices/loadSlice";
import React from "react";

export const LessonsModal = ({lessonNumber, dayOfWeekHeaderName, roomNumber}) => {

    const lessonsModalIsOpen = useSelector(state => state.roomPage.lessonsModal.isOpen)

    const dispatch = useDispatch()

    return <Modal className={'content'}
                  isOpen={lessonsModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setLessonsModalIsOpen(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={'dialog-content first-modal'}
    >
        <div className="controls-container">
            <div className="controls-button">
                <button className="control-button" onClick={() => dispatch(setLessonModalIsOpen(true))}>
                    Добавить занятие
                </button>
            </div>
        </div>

        <div className={'ag-theme-quartz'} style={{
            height: "600px",
            width: "auto",
        }}>
            <LessonsTableContainer lessonNumber={lessonNumber} dayOfWeek={dayOfWeekHeaderName} roomNumber={roomNumber}/>
        </div>
    </Modal>
}