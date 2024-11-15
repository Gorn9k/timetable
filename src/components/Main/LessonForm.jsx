import {ErrorMessage, Field, Form} from "formik";
import '../Main/Main.css'

export const LessonForm = ({isSubmitting, errors, touched, renderButton}) => {
    return <Form className={'form'}>
        <div>
            <label htmlFor="disciplineName">Дисциплина:</label>
            <Field name="disciplineName" type="text" id="disciplineName" disabled={true}
                   className={errors.disciplineName && touched.disciplineName ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="disciplineName" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="lessonType">Тип занятия:</label>
            <Field name="lessonType" type="text" id="lessonType" disabled={true}
                   className={errors.lessonType && touched.lessonType ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="lessonType" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="teacherFullName">Преподаватель:</label>
            <Field name="teacherFullName" type="text" id="teacherFullName" disabled={true}
                   className={errors.teacherFullName && touched.teacherFullName ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="teacherFullName" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="group">Группа:</label>
            <Field name="group" type="text" id="group" disabled={true}
                   className={errors.group && touched.group ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="group" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="subGroup">Подгруппа:</label>
            <Field name="subGroup" type="text" id="subGroup"
                   className={errors.subGroup && touched.subGroup ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="subGroup" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="weekType">Неделя:</label>
            <Field name="weekType" type="text" id="weekType"
                   className={errors.weekType && touched.weekType ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="weekType" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="startDate">С:</label>
            <Field name="startDate" type="date" id="startDate"
                   className={errors.startDate && touched.startDate ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="startDate" component="div"
                      className={'error-message'}/>
        <div>
            <label htmlFor="endDate">По:</label>
            <Field name="endDate" type="date" id="endDate"
                   className={errors.endDate && touched.endDate ? 'error' : undefined}/>
        </div>
        <ErrorMessage name="endDate" component="div"
                      className={'error-message'}/>
        {renderButton(isSubmitting)}
    </Form>
}