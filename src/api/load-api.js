import axios from "axios";
import {unAuthorized} from "./api";

const defaultOptionsPatentLoad = {
    //baseURL: "http://192.168.11.252:18076/",
    baseURL: "https://schedulecit.vstu.by/nagr",
    headers: {
        "Content-Type": "application/json",
    },
};
let baseRoutPatentLoad = axios.create(defaultOptionsPatentLoad);

baseRoutPatentLoad.interceptors.request.use(function (config) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidnN0dS1lbGVjdHJvbmljam91cm5hbCJdLCJ1c2VyX25hbWUiOiJLYXpha292X2lzYXBAdml0LnZzdHUuYnkiLCJzY29wZSI6WyJyZWFkIiwiY3JlYXRlIiwid3JpdGUiLCJleHBvcnQiXSwicm9sZXMiOlsiU1RVREVOVCIsIkhFQURfT0ZfREVQQVJUTUVOVCIsIlVTRVIiXSwiZXhwIjoxNzMxMDkyMDg0LCJmaW8iOiLQmtCw0LfQsNC60L7QsiDQki4g0JUuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVFVERU5UIiwiUk9MRV9VU0VSIiwiUk9MRV9IRUFEX09GX0RFUEFSVE1FTlQiXSwianRpIjoiN09sM2l5TmtwUzVkSEZfWVlEbGJLTEhPVF9RIiwiZW1haWwiOiJLYXpha292X2lzYXBAdml0LnZzdHUuYnkiLCJpZF9mcm9tX3NvdXJjZSI6MTYzLCJjbGllbnRfaWQiOiJWU1RVX0VMRUNUUk9OSUNKT1VSTkFMX0NMSUVOVCJ9.7ViRdi2MiLNFWh8HGd_sBUl-1fcZtqjszXHqjZmrGf4';
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export const getLoad = () => {
    return baseRoutPatentLoad
        .get(`/department-workload/get?department=ИСиТ&learnYear=2024-2025`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            unAuthorized(error);
        });
}
