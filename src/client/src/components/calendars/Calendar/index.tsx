import moment from 'moment'
import { useEffect, useState } from 'react'
import { CalendarBody } from './CalendarBody'
import { CalendarHeader } from './CalendarHeader'
import './styles.css'

type Props = {
    eventsToDisplay?: any
    onCellSelect?: any
}

export const Calendar : React.FC<Props> = ({
    eventsToDisplay,
    onCellSelect
}) => {

    const [activeTimeframe, setActiveTimeframe] = useState<any>('tf-month')
    const [yearOptions, setYearOptions] = useState<any>()
    const [monthOptions, setMonthOptions] = useState<any>()
    const [selectedYear, setSelectedYear] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState<any>()
    const [selectedWeek, setSelectedWeek] = useState<any>()
    const [selectedDay, setSelectedDay] = useState<any>(new Date(new Date().setHours(0,0,0,0)))


    useEffect(() => {
        generateYearOptions()
        generateMonthOptions()
    })

    useEffect(() => {
    }, [activeTimeframe])

    const generateYearOptions = () => {
        if (!yearOptions?.length) {
            const yrs = generateArrayOfYears()
            const menu = yrs?.map((yr: any) => {
                return (
                    <option value={yr}>{yr}</option>
                )
            })  || []
            setYearOptions(menu)
        } 
    }

    const generateMonthOptions = () => {
        if (!monthOptions?.length) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
            const menu = months?.map((month: any) => {
                return (
                    <option value={month}>{month}</option>
                )
            })  || []
            setMonthOptions(menu)
        }
    }

    const generateArrayOfYears = () => {
        const min = new Date().getFullYear() - 50
        const max = min + 150
        const years = []
        for (let i = min; i <= max; i++) {
          years.push(i)
        }
        return years
    }

    const onTimeframeSelect = (timeframe: any) => {
        const atf = document?.getElementById(activeTimeframe);
        atf?.style.removeProperty('border')
        atf?.style.removeProperty('background-color')
        setActiveTimeframe(timeframe)
        const natf : any = document?.getElementById(timeframe);
        natf.style.border = '1px solid #91ebff'
        natf.style.backgroundColor = '#e4faff'
        natf.className += 'active'
    }

    const onDateSelect = (data: any) => {
        console.log('selected date:', data)
        setSelectedDay(data)
        onCellSelect(data)
    }


    return (
        <div className="calendar">
            <CalendarHeader
                activeTimeframe={activeTimeframe}
                onTimeframeSelect={onTimeframeSelect}
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
            />
            <div className="calendar-body">
                <CalendarBody
                    activeTimeframe={activeTimeframe}
                    selectedDay={selectedDay}
                    onDateSelect={onDateSelect}
                    events={eventsToDisplay}
                />
            </div>
        </div>
    )
}