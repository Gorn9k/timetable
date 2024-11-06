import Select from "react-select";

export const SemesterSelectContainer = () => {
    const semesters = []

    for (let i = 1; i < 13; i++) {
        semesters.push(
            {
                value: i, label: `${i}-й номер семестра`
            }
        )
    }

    return <Select placeholder={'Выберите номер семестра'}
                   options={semesters}
                   isClearable={true}
                   onChange={(e) => e && console.log(`Вы выбрали ${e.label}`)}/>
}