import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {setLessonModalIsOpen} from "../../redux/slices/roomSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React from "react";
import {LessonFormContainer} from "./LessonFormContainer";

export const LessonModal = () => {

    const lessonModalIsOpen = useSelector(state => state.roomPage.lessonModal.isOpen)

    const dispatch = useDispatch()

    return <Modal className={'content'}
                  isOpen={lessonModalIsOpen}
                  onRequestClose={() => {
                      dispatch(setLessonModalIsOpen(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={'dialog-content second-modal'}
    >
        <LessonFormContainer/>
    </Modal>
}