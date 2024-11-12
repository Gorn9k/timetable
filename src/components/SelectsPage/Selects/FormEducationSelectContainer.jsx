import Select from "react-select";
import {useDispatch} from "react-redux";
import {setEducationForm} from "../../../redux/slices/loadSlice";

export const FormEducationSelectContainer = ({educationForm}) => {
    const educationForms = [
        {
            value: 'очная', label: 'Очная форма обучения'
        },
        {
            value: 'заочная', label: 'Заочная форма обучения'
        },
        {
            value: 'заочная сокр.', label: 'Заочная сокращенная форма обучения'
        }
    ]

    const dispatch = useDispatch();

    return <Select placeholder={'Выберите форму обучения'}
                   options={educationForms}
                   defaultValue={educationForm ? educationForms.find(value =>
                       value.value === educationForm) : undefined}
                   isClearable={true}
                   onChange={(e) => (e && dispatch(setEducationForm(e.value))) || dispatch(setEducationForm(null))}/>
}