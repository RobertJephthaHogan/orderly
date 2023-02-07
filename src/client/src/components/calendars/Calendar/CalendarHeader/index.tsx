import React, { useEffect, useState } from 'react'
import { indexMonthMap, monthIndexMap } from '../../../../data/monthIndexMap'
import './styles.css'

type Props = {
    activeTimeframe?: any
    monthOptions?: any
    yearOptions?: any
    onTimeframeSelect?: any
    selectedDay?:any
    onDateSelect?: any
}

export const CalendarHeader : React.FC<Props> = ({
    activeTimeframe,
    monthOptions,
    yearOptions,
    onTimeframeSelect,
    selectedDay,
    onDateSelect
}) => {

    const [selectedYear, setSelectedYear] = useState<any>(selectedDay.getYear() + 1900)
    const [selectedMonth, setSelectedMonth] = useState<any>(indexMonthMap[selectedDay.getMonth()])


    useEffect(() => {
        setSelectedYear(selectedDay.getYear() + 1900)
        setSelectedMonth(indexMonthMap[selectedDay.getMonth()])
    }, [selectedDay])
    

    const onSelectedYearChange = (data: any) => {
        setSelectedYear(data?.target?.value)
        const newDate = new Date(selectedDay.setFullYear(data?.target?.value))
        onDateSelect(newDate)
    }

    const onSelectedMonthChange = (data: any) => {
        const newDate = new Date(selectedDay.setMonth(monthIndexMap[data?.target?.value]))
        onDateSelect(newDate)
    }

    return (
        <>
            <div className="calendar-header pt-1">
                <div className="calendar-header-left">
                    <div className='date-display-area'>
                        <span>Today is :</span>
                        <div>
                            {new Date().toString().split('GMT')[0]}
                        </div>
                    </div>
                    <div className='date-display-area ml-1'>
                        <span>Selected Date :</span>
                        <div>
                            {selectedDay.toString().split('GMT')[0]}
                        </div>
                    </div>
                </div>

                <div className="calendar-header-right">
                    <div className='date-selector-area'>
                        {
                            activeTimeframe === "tf-week" ? (
                                <div className='week-date-select-wrapper'>
                                    <div className='month-select'>
                                        <select 
                                            name="month"
                                            onChange={onSelectedMonthChange}
                                            value={selectedMonth}
                                        >
                                            {monthOptions}
                                        </select>
                                    </div>
                                    <div className='year-select ml-1'>
                                        <select 
                                            name="year"
                                            value={selectedYear}
                                            onChange={onSelectedYearChange}
                                        >
                                            {yearOptions}
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        {
                            activeTimeframe === "tf-month" ? (
                                <div className='month-date-select-wrapper'>
                                    <div className='month-select'>
                                        <select 
                                            name="month"
                                            onChange={onSelectedMonthChange}
                                            value={selectedMonth}
                                        >
                                            {monthOptions}
                                        </select>
                                    </div>
                                    <div className='year-select ml-1'>
                                        <select 
                                            name="year"
                                            value={selectedYear}
                                            onChange={onSelectedYearChange}
                                        >
                                            {yearOptions}
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        {
                            activeTimeframe === "tf-year" ? (
                                <div className='year-select'>
                                    <select
                                        name="year"
                                        value={selectedYear}
                                        onChange={onSelectedYearChange}
                                    >
                                        {yearOptions}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>

                    <div className='timeframe-radio'>
                        <div 
                            className='timeframe-week tf-btn' 
                            data-timeframe-select="week"
                            onClick={() => onTimeframeSelect('tf-week')}
                            id='tf-week'
                        >
                            <span className='timeframe-text'>Week</span>
                        </div>
                        <div 
                            className='timeframe-month tf-btn' 
                            data-timeframe-select="month"
                            onClick={() => onTimeframeSelect('tf-month')}
                            id='tf-month'
                        >
                            <span className='timeframe-text'>Month</span>
                        </div>
                        <div 
                            className='timeframe-year tf-btn' 
                            data-timeframe-select="year"
                            onClick={() => onTimeframeSelect('tf-year')}
                            id='tf-year'
                        >
                            <span className='timeframe-text'>Year</span>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}