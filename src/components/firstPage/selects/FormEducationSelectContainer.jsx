import Select from "react-select";

export const FormEducationSelectContainer = () => {
    const educationForms = [
        {
            value: 'Очная', label: 'Очная форма обучения'
        },
        {
            value: 'Заочная', label: 'Заочная форма обучения'
        },
        {
            value: 'Заочная сокращенная', label: 'Заочная сокращенная форма обучения'
        }
    ]

    return <Select placeholder={'Выберите форму обучения'}
                   options={educationForms}
                   isClearable={true}
                   onChange={(e) => e && console.log(`Вы выбрали ${e.label}`)}/>
}