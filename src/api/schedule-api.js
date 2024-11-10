import axios from "axios";
import {unAuthorized} from "./api";

const defaultOptionsPatentSchedule = {
    //baseURL: "http://192.168.11.252:18076/",
    baseURL: "https://schedule.vstu.by/api/schedule",
    headers: {
        "Content-Type": "application/json",
    },
};

let baseRoutPatentSchedule = axios.create(defaultOptionsPatentSchedule);

export const getTeacherSchedule = (teacherFio) => {
    return baseRoutPatentSchedule
        .get(`/teacherFIO?fio=${teacherFio}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            unAuthorized(error);
        });
}

export const getGroupSchedule = (groupName) => {
    return baseRoutPatentSchedule
        .get(`/group?name=${groupName}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            unAuthorized(error);
        });
}