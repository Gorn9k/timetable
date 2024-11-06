import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App/App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { agGridRu } from "../../assets/agLocalization";
import {
  getTimetableThunk,
  getDisciplineThunk,
  getTeacherThunk,
  getGroupThunk,
  updateTimetableThunk,
  editTimetableThunk,
  getFacultiesThunk,
  getExcelScheduleThunk,
  deleteScheduleRowThunk,
  getRoomsThunk,
  getExcelScheduleZfThunk,
  getScheduleThunk,
  HideGroupThunk,
  getHiddenGroupsThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalMain from "./ModalMain";
import { Toaster } from "react-hot-toast";
import ExcelModal from "./ExcelModal";
import HideGroupModal from "./HideGroupModal";
import ScheduleModal from "./ScheduleModal";

const frameComparator = (valueA, valueB) => {
  const frame = ["1Корпус", "2Корпус", "4Корпус", "5Корпус", "Неизвестно"];
  const indexA = frame.indexOf(valueA);
  const indexB = frame.indexOf(valueB);
  return indexA - indexB;
};
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
const dayComparator = (valueA, valueB) => {
  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const indexA = daysOfWeek.indexOf(valueA);
  const indexB = daysOfWeek.indexOf(valueB);

  return indexA - indexB;
};

const timeComparator = (valueA, valueB) => {
  const timeOfLesson = [
    "8:00",
    "9:50",
    "11:40",
    "14:00",
    "15:45",
    "17:30",
    "19:15",
    " ",
  ];

  const indexA = timeOfLesson.indexOf(valueA);
  const indexB = timeOfLesson.indexOf(valueB);

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
  const [inputDate, setInputDate] = useState({
    dateFrom:
      localStorage.getItem("dateFrom") === null
        ? ""
        : localStorage.getItem("dateFrom"),
    dateTo:
      localStorage.getItem("dateTo") === null
        ? ""
        : localStorage.getItem("dateTo"),
  });
  const [columnDefs] = useState([
    {
      field: "frameTable",
      rowGroup: true,
      hide: true,
      headerName: "Корпус",
      comparator: frameComparator,
      sort: "asc",
    },
    {
      field: "roomNumberTable",
      rowGroup: true,
      hide: true,
      headerName: "Аудитория",
    },
    {
      field: "dayTable",
      rowGroup: true,
      hide: true,
      headerName: "День",
      comparator: dayComparator,
    },
    {
      field: "lessonNumberTable",
      headerName: "Время",
      comparator: timeComparator,
      sort: "asc",
      columnGroupShow: "open",
    },
    { field: "disciplineName", headerName: "Дисциплина" },
    { field: "lessonTypeTable", headerName: "Тип" },
    { field: "teacherFullName", headerName: "Преподаватель" },
    { field: "group", headerName: "Группа" },
    { field: "subGroupTable", headerName: "Подгруппа" },
    {
      field: "weekTypeTable",
      headerName: "Неделя",
      comparator: weekComparator,
      sort: "asc",
    },
    {
      field: "startDate",
      headerName: "С",
      cellStyle: (params) => {
        if (params && params.data && params.data.startDate) {
          if (params.data.startDate === params.data.endDate) {
            const date = new Date(params.data.startDate);
            const dayMatch =
              params.data.dayTable === daysForDate[date.getDay()];
            if (!dayMatch) {
              return { color: "red" };
            }
          }
        }
      },
    },
    {
      field: "endDate",
      headerName: "По",
    },
  ]);

  const [dataRow, setDataRow] = useState();
  const [maxId, setMaxId] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState("");

  const onInputChange = (e) => {
    gridApi.setGridOption("quickFilterText", e.target.value);
  };

  const handleDateChange = (e) => {
    let newRowData;
    if (e.target.value === "") {
      localStorage.removeItem("date");
      newRowData = props.timetable;
      setRowData(newRowData);
    } else {
      localStorage.setItem("date", e.target.value);
      let date = new Date(e.target.value);
      newRowData = props.timetable.filter((item) => {
        return new Date(item.endDate) >= date || item.endDate === null;
      });
      setRowData(newRowData);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("date")) {
      let newRowData = props.timetable.filter((item) => {
        return (
          new Date(item.startDate) >= new Date(localStorage.getItem("date")) ||
          item.startDate === null
        );
      });
      setRowData(newRowData);
    } else {
      setRowData(props.timetable);
    }
  }, [props.timetable]);
  useEffect(() => {
    props.getTimetableThunk();
    props.getFacultiesThunk();
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      minWidth: 100,
      sortable: true,
      sortingOrder: ["asc", "desc"],
      resizable: true,
      getQuickFilterText: (params) => {
        return params.colDef.field === "roomNumberTable"
          ? params.value.replace(/\s+.*/, "")
          : "";
      },
    };
  }, []);

  const getRowStyle = useCallback((params) => {
    if (params.data && params.data.lessonId !== null) {
      return { background: "#FF8484" };
    } else if (params.data && params.data.lessonId === null) {
      return { background: "#83CF55" };
    }
  }, []);

  const gridOptions = useMemo(() => {
    return {
      getRowStyle: getRowStyle,
      groupDefaultExpanded: 2,
      defaultColDef: defaultColDef,
      quickFilterMatcher: (quickFilterParts, rowQuickFilterAggregateText) => {
        return quickFilterParts.every(
          (part) => rowQuickFilterAggregateText === part
        );
      },
      groupDisplayType: "multipleColumns",
      animateRows: true,
      rowSelection: "single",
      autoGroupColumnDef: {
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params) => {
            if (params.node.rowGroupIndex === 2) {
              return `(${params.node.childrenAfterFilter.length - 1}) ${
                params.node.key
              }`;
            } else {
              return params.node.key;
            }
          },
        },
      },
    };
  }, [getRowStyle, defaultColDef]);
  const onGridReady = useCallback(
    (params) => {
      props.getDisciplineThunk();
      props.getTeacherThunk();
      props.getGroupThunk();
      props.getRoomsThunk();
      setGridApi(params.api);
    },
    [props]
  );
  const handleRowClicked = (data) => {
    setDataRow(data.data);
    const maxId = props.timetable.reduce((max, obj) => {
      return obj.id > max ? obj.id : max;
    }, 0);
    setMaxId(maxId);
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setDataRow();
    setInputDate({
      dateFrom:
        localStorage.getItem("dateFrom") === null
          ? ""
          : localStorage.getItem("dateFrom"),
      dateTo:
        localStorage.getItem("dateTo") === null
          ? ""
          : localStorage.getItem("dateTo"),
    });
  };

  const [ExcelModalIsOpen, setExcelIsOpen] = useState(false);
  const ExcelOpenModal = () => {
    setExcelIsOpen(true);
  };
  const ExcelCloseModal = () => {
    setExcelIsOpen(false);
  };

  const [HideGroupModalIsOpen, setHideGroupIsOpen] = useState(false);
  const HideGroupOpenModal = () => {
    setHideGroupIsOpen(true);
    props.getHiddenGroupsThunk();
  };
  const HideGroupCloseModal = () => {
    setHideGroupIsOpen(false);
  };

  const [ScheduleModalIsOpen, setScheduleIsOpen] = useState(false);
  const ScheduleOpenModal = () => {
    setScheduleIsOpen(true);
    props.getHiddenGroupsThunk();
  };
  const ScheduleCloseModal = () => {
    setScheduleIsOpen(false);
  };

  if (props.timetable && props.timetable.length !== 0) {
    return (
      <>
        <ModalMain
          setRowData={setRowData}
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          dataRow={dataRow}
          discipline={props.discipline}
          teacher={props.teacher}
          group={props.group}
          typeOfLesson={props.typeOfLesson}
          updateTimetableThunk={props.updateTimetableThunk}
          timetable={props.timetable}
          editTimetableThunk={props.editTimetableThunk}
          maxId={maxId}
          setDataRow={setDataRow}
          rooms={props.rooms}
          daysForDate={daysForDate}
          inputDate={inputDate}
          setInputDate={setInputDate}
        ></ModalMain>
        <ExcelModal
          ExcelModalIsOpen={ExcelModalIsOpen}
          ExcelOpenModal={ExcelOpenModal}
          ExcelCloseModal={ExcelCloseModal}
          getExcelScheduleThunk={getExcelScheduleThunk}
          getExcelScheduleZfThunk={getExcelScheduleZfThunk}
          faculty={props.faculty}
          group={props.group}
        ></ExcelModal>
        <HideGroupModal
          HideGroupModalIsOpen={HideGroupModalIsOpen}
          HideGroupOpenModal={HideGroupOpenModal}
          HideGroupCloseModal={HideGroupCloseModal}
          group={props.group}
          HideGroupThunk={props.HideGroupThunk}
          getHiddenGroupsThunk={props.getHiddenGroupsThunk}
          hiddenGroups={props.hiddenGroups}
        ></HideGroupModal>
        <ScheduleModal
          ScheduleModalIsOpen={ScheduleModalIsOpen}
          ScheduleOpenModal={ScheduleOpenModal}
          ScheduleCloseModal={ScheduleCloseModal}
          teacher={props.teacher}
          getScheduleThunk={getScheduleThunk}
        ></ScheduleModal>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{ marginTop: "100px" }}
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
          <div className="controls-container-inputs">
            <input
              className="control-input-search"
              type="text"
              // value={filterText}
              id="filter-text-box"
              placeholder="Аудитория..."
              onChange={onInputChange}
            />
            <input
              type="date"
              className="semester-date"
              value={localStorage.getItem("date")}
              onChange={handleDateChange}
            ></input>
          </div>
          <div className="controls-button">
            <button className="control-button" onClick={ScheduleOpenModal}>
              Расписание
            </button>
            <button className="control-button" onClick={HideGroupOpenModal}>
              Скрыть группу
            </button>
            <button className="control-button" onClick={ExcelOpenModal}>
              Excel
            </button>
            <button
              className="control-button"
              onClick={() => {
                props.deleteScheduleRowThunk(dataRow.id);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{
            height: "calc(100vh - 158px)",
            width: "100vw",
            margin: "auto",
          }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            localeText={agGridRu}
            onGridReady={onGridReady}
            onRowClicked={handleRowClicked}
            onRowDoubleClicked={dataRow && openModal}
            suppressHorizontalScroll={true}
          ></AgGridReact>
        </div>
      </>
    );
  } else {
    return (
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    timetable: state.mainPage.timetable,
    discipline: state.mainPage.discipline,
    teacher: state.mainPage.teacher,
    group: state.mainPage.group,
    typeOfLesson: state.mainPage.typeOfLesson,
    faculty: state.mainPage.faculty,
    rooms: state.mainPage.rooms,
    hiddenGroups: state.mainPage.hiddenGroups,
  };
};
const mapDispatchToProps = {
  getTimetableThunk,
  getDisciplineThunk,
  getTeacherThunk,
  getGroupThunk,
  updateTimetableThunk,
  editTimetableThunk,
  getFacultiesThunk,
  getExcelScheduleThunk,
  deleteScheduleRowThunk,
  getRoomsThunk,
  getExcelScheduleZfThunk,
  getScheduleThunk,
  HideGroupThunk,
  getHiddenGroupsThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);