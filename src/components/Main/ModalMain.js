import {useState, useRef, useEffect} from "react";
import Select from "react-select-virtualized";
import SelectOld from "react-select";
import Modal from "react-modal";
import {
    lessonHours,
    lessonOfType,
    subGroup,
    weekType,
    weekdays,
} from "./ConstantMain";
import sprite from "../../images/cross.svg";
import {ReactComponent as ErrorIcon} from "../../images/error-icon.svg";
import {useSelector} from "react-redux";

const ModalMain = (props) => {
    const [addDataRow, setAddDataRow] = useState({});
    const [check, setCheck] = useState(true);
    const [error, setError] = useState(false);

    const teacherFio = useSelector(state => state.loadPage.teacherFio)
    const groupName = useSelector(state => state.loadPage.groupName);
    const lectureHours = useSelector(state => state.loadPage.lectureHours);
    const practiceHours = useSelector(state => state.loadPage.practiceHours);
    const laboratoryHours = useSelector(state => state.loadPage.laboratoryHours);

    const {inputDate, setInputDate} = props;
    useEffect(() => {
        setAddDataRow({
            ...props.dataRow,
            lessonId: props.maxId + 1,
        });
    }, [props.dataRow, props.maxId]);
    const customFilter = ({label}, input) => {
        return label.toLowerCase().startsWith(input.toLowerCase());
    };
    let date = new Date(localStorage.getItem("dateFrom"));

    return (
        <>
            <Modal
                ariaHideApp={false}
                className={"modal-window"}
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                contentLabel="Main Modal"
                overlayClassName={"modal_open"}
            >
                <div className="modal-menu-main">
                    <div className="modal-container">
                        <label className="modal-label">Корпус:</label>
                        <span className="modal-span">
              {props.dataRow && props.dataRow.frameTable}
            </span>
                    </div>
                    <div className="modal-container">
                        <label className="modal-label">
                            Аудитория: {props.dataRow && props.dataRow.roomNumber}
                        </label>
                        <Select
                            className=""
                            placeholder="Выберите аудиторию"
                            onChange={(e) => {
                                if (e !== null) {
                                    addDataRow.roomId = e.value;
                                    addDataRow.roomNumber = e.label;
                                }
                            }}
                            defaultValue={{value: "room", label: "Аудитория"}}
                            options={props.rooms
                                .map((room) => ({
                                    value: room.id,
                                    label: `${room.frame} ${room.roomNumber}`,
                                }))
                                .sort((a, b) => {
                                    const aRoomNumber = parseFloat(a.label.split(" ")[1]);
                                    const bRoomNumber = parseFloat(b.label.split(" ")[1]);
                                    if (isNaN(aRoomNumber) && isNaN(bRoomNumber)) {
                                        return a.label.localeCompare(b.label);
                                    } else if (isNaN(aRoomNumber)) {
                                        return 1;
                                    } else if (isNaN(bRoomNumber)) {
                                        return -1;
                                    } else {
                                        return aRoomNumber - bRoomNumber;
                                    }
                                })}
                            formatOptionLabel={({label}) => (
                                <div className="fast-option-custom" title={label}>
                                    {label}
                                </div>
                            )}
                        />
                    </div>
                    <div className="modal-container">
                        <div className="modal-container-div">
                            <label className="modal-label">
                                День недели: {props.dataRow && props.dataRow.dayTable}
                            </label>
                            <div
                                className={
                                    error ? "modal-div-error opacity1" : "modal-div-error"
                                }
                            >
                                <ErrorIcon/>
                                <label className="modal-label-error">
                                    День недели не совпадает с датой!
                                </label>
                            </div>
                        </div>
                        <Select
                            className=""
                            placeholder="День недели"
                            onChange={(e) => {
                                if (e !== null) {
                                    addDataRow.day = e.value;
                                }
                            }}
                            defaultValue={{value: "day", label: "День"}}
                            options={weekdays}
                            formatOptionLabel={({label}) => (
                                <div className="fast-option-custom" title={label}>
                                    {label}
                                </div>
                            )}
                        />
                    </div>
                    <div className="modal-container data-containers">
                        <div className="data-div">
                            <label className="modal-label">Дата С:</label>
                            <input
                                className="data"
                                type="date"
                                name="startDate"
                                value={inputDate.dateFrom}
                                onChange={(e) => {
                                    addDataRow.startDate = e.target.value;
                                    localStorage.setItem("dateFrom", e.target.value);
                                    setInputDate({...inputDate, dateFrom: e.target.value});
                                }}
                            ></input>
                        </div>
                        <div className="data-div">
                            <label className="modal-label">Дата По:</label>
                            <input
                                type="date"
                                className="data"
                                name="endDate"
                                value={inputDate.dateTo}
                                onChange={(e) => {
                                    addDataRow.endDate = e.target.value;
                                    localStorage.setItem("dateTo", e.target.value);
                                    setInputDate({...inputDate, dateTo: e.target.value});
                                }}
                            ></input>
                        </div>
                    </div>
                    <Select
                        className=""
                        placeholder="Выберите время"
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.lessonNumber = e.value;
                                addDataRow.lessonNumberTable = e.label;
                            }
                        }}
                        defaultValue={{value: "time", label: "Время"}}
                        options={lessonHours}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                    />
                    <Select
                        className=""
                        placeholder="Выберите дисциплину"
                        filterOption={customFilter}
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.disciplineName = e.label.substring(
                                    0,
                                    e.label.indexOf(" (")
                                );
                                addDataRow.disciplineId = e.value;
                            }
                        }}
                        defaultValue={{value: "discipline", label: "Дисциплина"}}
                        options={props.discipline.map((m) => ({
                            value: m.id,
                            label:
                                m.name +
                                " (" +
                                (m.department !== null
                                    ? m.department.shortName + " Наше"
                                    : "Нет кафедры") +
                                ")",
                        }))}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                    />

                    <SelectOld
                        isDisabled={true}
                        className=""
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.lessonType = e.value;
                                addDataRow.lessonTypeTable = e.label;
                            }
                        }}
                        value={{
                            value: (lectureHours && lessonOfType[0].value)
                                || (practiceHours && lessonOfType[1].value)
                                || (laboratoryHours && lessonOfType[2].value),
                            label: (lectureHours && lessonOfType[0].label)
                                || (practiceHours && lessonOfType[1].label)
                                || (laboratoryHours && lessonOfType[2].label)
                        }}
                        options={[]}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                    />
                    <Select
                        isDisabled={true}
                        className=""
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.teacherFullName = e.label;
                                addDataRow.teacherId = e.value;
                            }
                        }}
                        value={{
                            value: teacherFio && props.teacher.filter(value => value.fullName === teacherFio.fio)[0]?.id,
                            label: teacherFio && props.teacher.filter(value => value.fullName === teacherFio.fio)[0]?.fullName
                        }}
                        options={[]}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                    />
                    <Select
                        isDisabled={true}
                        className=""
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.group = e.label;
                                addDataRow.groupId = e.value;
                            }
                        }}
                        value={{
                            value: groupName && props.group.filter(value => value.name === groupName.name)[0]?.id,
                            label: groupName && props.group.filter(value => value.name === groupName.name)[0]?.name
                        }}
                        options={[]}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                    />
                    <Select
                        className=""
                        placeholder="Выберите подгруппу"
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.subGroup = e.value;
                                addDataRow.subGroupTable = e.label;
                            }
                        }}
                        defaultValue={{value: "subGroup", label: "Подгруппа"}}
                        options={subGroup}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                        menuPlacement="top"
                    />
                    <Select
                        className=""
                        placeholder="Выберите неделю"
                        onChange={(e) => {
                            if (e !== null) {
                                addDataRow.weekType = e.value;
                                addDataRow.weekTypeTable = e.label;
                            }
                        }}
                        defaultValue={{value: "week", label: "Неделя"}}
                        options={weekType}
                        formatOptionLabel={({label}) => (
                            <div className="fast-option-custom" title={label}>
                                {label}
                            </div>
                        )}
                        menuPlacement="top"
                    />
                    {/* Yamaxilla Больше не делай на один запрос 2 метода <3 */}
                    <div className="block-edit-add">
                        {props.dataRow && props.dataRow.id !== null ? (
                            <button
                                className="btn-add"
                                onClick={() => {
                                    let index = props.timetable.findIndex(
                                        (obj) => obj.lessonId === addDataRow.lessonId
                                    );
                                    if (index !== -1) {
                                        addDataRow.id = props.dataRow.lessonId;
                                        props.timetable[index] = addDataRow;
                                    }
                                    if (localStorage.getItem("dateFrom")) {
                                        addDataRow.startDate = localStorage.getItem("dateFrom");
                                    }
                                    if (localStorage.getItem("dateTo")) {
                                        addDataRow.endDate = localStorage.getItem("dateTo");
                                    }
                                    props.updateTimetableThunk(addDataRow, check);
                                }}
                            >
                                Редактировать
                            </button>
                        ) : (
                            <button
                                className="btn-update"
                                onClick={() => {
                                    addDataRow.teacherFullName = teacherFio && teacherFio.fio;
                                    addDataRow.teacherId = teacherFio && props.teacher.filter(value => value.fullName === teacherFio.fio)[0]?.id;
                                    addDataRow.group = groupName && groupName.name;
                                    addDataRow.groupId = groupName && props.group.filter(value => value.name === groupName.name)[0]?.id;
                                    addDataRow.lessonType = (lectureHours && lessonOfType[0].value)
                                        || (practiceHours && lessonOfType[1].value)
                                        || (laboratoryHours && lessonOfType[2].value);
                                    addDataRow.lessonTypeTable = (lectureHours && lessonOfType[0].label)
                                        || (practiceHours && lessonOfType[1].label)
                                        || (laboratoryHours && lessonOfType[2].label);
                                    const newTimetable = props.timetable;
                                    if (localStorage.getItem("dateFrom")) {
                                        addDataRow.startDate = localStorage.getItem("dateFrom");
                                    }
                                    if (localStorage.getItem("dateTo")) {
                                        addDataRow.endDate = localStorage.getItem("dateTo");
                                    }
                                    console.log(
                                        props.dataRow.dayTable,
                                        props.daysForDate[date.getDay()]
                                    );
                                    if (
                                        props.dataRow &&
                                        props.dataRow.dayTable === props.daysForDate[date.getDay()]
                                    ) {
                                        newTimetable.unshift(addDataRow);
                                        props.editTimetableThunk(newTimetable);
                                        props.updateTimetableThunk(addDataRow, check);
                                    } else {
                                        setError(true);
                                        setTimeout(() => setError(false), 3000);
                                    }
                                }}
                            >
                                Добавить
                            </button>
                        )}
                    </div>
                    <div className="block-check-close">
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <label className="check-label">Включить проверки</label>
                            <input
                                type="checkbox"
                                style={{height: "20px", width: "20px"}}
                                checked={check}
                                onChange={(e) => setCheck(e.target.checked)}
                            ></input>
                            <button
                                className="btn-clear-date"
                                onClick={() => {
                                    localStorage.removeItem("dateFrom");
                                    localStorage.removeItem("dateTo");
                                    setInputDate({
                                        dateFrom:
                                            props.dataRow.startDate === null
                                                ? ""
                                                : props.dataRow.startDate,
                                        dateTo:
                                            props.dataRow.endDate === null
                                                ? ""
                                                : props.dataRow.endDate,
                                    });
                                    addDataRow.startDate = props.dataRow.startDate;
                                    addDataRow.endDate = props.dataRow.endDate;
                                }}
                            >
                                Очистить даты
                            </button>
                        </div>
                        <button className="btn-close" onClick={props.closeModal}>
                            <div className="svg-block">
                                <svg className="cross" width={20} height={20} fill="#fff">
                                    <use xlinkHref={`${sprite}#cross`}/>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalMain;
