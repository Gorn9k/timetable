import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import * as Yup from "yup";
import {LessonForm} from "./LessonForm";
import '../Main/Main.css'
import {useEffect} from "react";
import {setSelectedLesson} from "../../redux/slices/roomSlice";

export const LessonFormContainer = () => {

    const selectedLesson = useSelector((state) => state.roomPage.selectedLesson)

    const disciplineName = useSelector((state) => state.loadPage.disciplineName)
    const teacherFio = useSelector((state) => state.loadPage.teacherFio)
    const groupName = useSelector((state) => state.loadPage.groupName)
    const lectureHours = useSelector(state => state.loadPage.lectureHours)
    const practiceHours = useSelector(state => state.loadPage.practiceHours)
    const laboratoryHours = useSelector(state => state.loadPage.laboratoryHours)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(setSelectedLesson(null))
    }, []);

    return <Formik
        initialValues={{
            id: selectedLesson?.id,
            disciplineName: disciplineName || selectedLesson?.disciplineName || '',
            lessonType: (lectureHours?.id && 'Лекция') || (practiceHours?.id && 'Практика')
                || (laboratoryHours?.id && 'Лабораторная') || selectedLesson?.lessonType || '',
            teacherFullName: teacherFio || selectedLesson?.teacherFullName || '',
            group: groupName || selectedLesson?.group || '',
            subGroup: selectedLesson?.subGroup || '',
            weekType: selectedLesson?.weekType || '',
            startDate: selectedLesson?.startDate || '',
            endDate: selectedLesson?.endDate || ''
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
            disciplineName: Yup.string()
                .required('Поле не может быть пустым'),
            lessonType: Yup.string()
                .required('Поле не может быть пустым'),
            teacherFullName: Yup.string()
                .required('Поле не может быть пустым'),
            group: Yup.string()
                .required('Поле не может быть пустым'),
            subGroup: Yup.string()
                .required('Поле не может быть пустым'),
            weekType: Yup.string()
                .required('Поле не может быть пустым'),
            startDate: Yup.string()
                .required('Поле не может быть пустым'),
            endDate: Yup.string()
                .required('Поле не может быть пустым')
        })}
        onSubmit={(values) => {
            // if (selectedLesson?.id)
            //     dispatch(editLoadInfoInit({loadInfo: values}));
            // else
            //     dispatch(createLoadInfoInit({loadInfo: values}));
        }}
    >
        {
            (({setFieldTouched, setErrors, isSubmitting, errors, touched}) => {
                // return <FormFieldsErrors setErrors={setErrors} setFieldTouched={setFieldTouched}>
                //     <h2>{`${(loadInfo?.id && 'Текущая') || 'Новая'} нагрузка`}</h2>
                //     <LoadInfoForm renderButton={(disabled: boolean) =>
                //         <button type="submit" disabled={disabled}
                //                 className={`${generalStyles.button} ${generalStyles.formButton}`}>
                //             {(loadInfo?.id && 'Сохранить изменения') || 'Создать'}
                //         </button>
                //     } errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                // </FormFieldsErrors>
                return <>
                    <h2>{`${(selectedLesson?.id && 'Редактирование') || 'Создание'} занятия`}</h2>
                    <LessonForm renderButton={(disabled) =>
                        <button type="submit" disabled={disabled}
                                className={`button form-button`}>
                            {(selectedLesson?.id && 'Сохранить изменения') || 'Создать'}
                        </button>
                    } errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                </>
            })
        }
    </Formik>
}