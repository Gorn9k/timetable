import Select from "react-select";

export const EducationYearSelectContainer = () => {
    const educationYears = [
        {
            value: '2024',
            label: '2024-й учебный год'
        }
    ]

    return <Select placeholder={'Выберите учебный год'}
                   options={educationYears}
                   isClearable={true}
                   onChange={(e) => e && console.log(`Вы выбрали ${e.label}`)}/>
}