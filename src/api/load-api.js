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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZGVhbiIsInZzdHUtZWxlY3Ryb25pY2pvdXJuYWwiXSwidXNlcl9uYW1lIjoiYWRtaW5AZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsInJzcWwiLCJ3cml0ZSIsImV4cG9ydCJdLCJyb2xlcyI6WyJTVFVERU5UIiwiQURNSU4iLCJVU0VSIiwiUkVDVE9SIl0sImV4cCI6MTczMTY2MDY5MSwiZmlvIjoiQWRtaW4iLCJhdXRob3JpdGllcyI6WyJST0xFX1NUVURFTlQiLCJST0xFX0FETUlOIiwiUk9MRV9VU0VSIiwiUk9MRV9SRUNUT1IiXSwianRpIjoibkV2VmJRMXJRTTlvNlVLWmJVSTVVMG4xU1lVIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpZF9mcm9tX3NvdXJjZSI6MTYyODMsImNsaWVudF9pZCI6IkRFQU4ifQ.1ugtJq7xd61Yir4rSw3B7yit2LzzaXsgw6jmCZcHybU';
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