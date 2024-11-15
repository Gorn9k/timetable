import axios from "axios";
import {unAuthorized} from "./api";

const defaultOptionsPatentLoad = {
    //baseURL: "http://192.168.11.252:8086/",
    baseURL: "https://schedulecit.vstu.by/nagr",
    headers: {
        "Content-Type": "application/json",
    },
};
let baseRoutPatentLoad = axios.create(defaultOptionsPatentLoad);

baseRoutPatentLoad.interceptors.request.use(function (config) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidnN0dS1lbGVjdHJvbmljam91cm5hbCJdLCJ1c2VyX25hbWUiOiJLYXpha292X2lzYXBAdml0LnZzdHUuYnkiLCJzY29wZSI6WyJyZWFkIiwiY3JlYXRlIiwicnNxbCIsIndyaXRlIiwiZXhwb3J0Il0sInJvbGVzIjpbIlNUVURFTlQiLCJIRUFEX09GX0RFUEFSVE1FTlQiLCJVU0VSIl0sImV4cCI6MTczMTc1OTM5OSwiZmlvIjoi0JrQsNC30LDQutC-0LIg0JIuINCVLiIsImF1dGhvcml0aWVzIjpbIlJPTEVfU1RVREVOVCIsIlJPTEVfVVNFUiIsIlJPTEVfSEVBRF9PRl9ERVBBUlRNRU5UIl0sImp0aSI6IlVNRGFBZ3cwT1p3bmc1V1lqNmtFVUFhSUU2ZyIsImVtYWlsIjoiS2F6YWtvdl9pc2FwQHZpdC52c3R1LmJ5IiwiaWRfZnJvbV9zb3VyY2UiOjE2MywiY2xpZW50X2lkIjoiVlNUVV9FTEVDVFJPTklDSk9VUk5BTF9DTElFTlQifQ.GJ-FgE7vxuV6Fqri7JhHpVDtsKPF8uk1HMv9ygp0w_Q';
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export const getLoad = (departmentShortName, educationForm, semesterName, learnYear) => {
    return baseRoutPatentLoad
        .get(`/department-workload/get?department=${departmentShortName}&learnYear=${learnYear}&semester=${semesterName}&studyForm=${educationForm}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            unAuthorized(error);
        });
}