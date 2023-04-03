
import MonthView from './MonthView'
import YearView from './YearView'
import './styles.css'
import WeekView from './WeekView'


type Props = {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}

export const CalendarBody : React.FC<Props> = ({
    activeTimeframe,
    events,
    tasks,
    selectedDay,
    onDateSelect
}) => {


    if (activeTimeframe === 'tf-year') {
        return (
            <YearView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    } else if (activeTimeframe === 'tf-month') {
        return (
            <MonthView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    } else if (activeTimeframe === 'tf-week') {
        return (
            <WeekView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    }

    return (
        <>
            CalendarBody!
        </>
    )
}




