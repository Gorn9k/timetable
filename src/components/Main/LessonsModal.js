import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {setModalIsOpen} from "../../redux/slices/roomSlice";
import {LessonsTableContainer} from "./LessonsTableContainer";

export const LessonsModal = ({lessonNumber, dayOfWeekHeaderName, roomNumber}) => {

    const modalIsOpen = useSelector(state => state.roomPage.modal.isOpen)

    const dispatch = useDispatch()

    return <Modal className={'modal-window'}
                  isOpen={modalIsOpen}
                  onRequestClose={() => {
                      dispatch(setModalIsOpen(false))
                  }}
                  contentLabel="Модальное окно приложения"
                  overlayClassName={'modal_open'}
    >
        <LessonsTableContainer lessonNumber={lessonNumber} dayOfWeek={dayOfWeekHeaderName} roomNumber={roomNumber}/>
    </Modal>
}