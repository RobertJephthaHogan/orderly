import { Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { indexMonthMap, monthIndexMap } from '../../../../data/monthIndexMap'
import './styles.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

type Props = {
    activeTimeframe?: any
    onTimeframeSelect?: any
    selectedDay?:any
    onDateSelect?: any
}

export const CalendarHeader : React.FC<Props> = ({
    activeTimeframe,
    onTimeframeSelect,
    selectedDay,
    onDateSelect
}) => {

    const [selectedYear, setSelectedYear] = useState<any>(selectedDay.getYear() + 1900)
    const [selectedMonth, setSelectedMonth] = useState<any>(indexMonthMap[selectedDay.getMonth()])
    const [monthOptions, setMonthOptions] = useState<any>()
    const [yearOptions, setYearOptions] = useState<any>()


    useEffect(() => {
        setSelectedYear(selectedDay.getYear() + 1900)
        setSelectedMonth(indexMonthMap[selectedDay.getMonth()])
    }, [selectedDay])
    

    const onSelectedYearChange = (data: any) => {
        setSelectedYear(data?.target?.value)
        //const newDate = new Date(selectedDay.setFullYear(data?.target?.value)) // when using normal html select
        const newDate = new Date(selectedDay.setFullYear(data))
        onDateSelect(newDate)
    }

    const onSelectedMonthChange = (data: any) => {
        console.log('data', data)
        const newDate = new Date(selectedDay.setMonth(monthIndexMap[data])) // for antd select
        //const newDate = new Date(selectedDay.setMonth(monthIndexMap[data?.target?.value])) // for normal select
        onDateSelect(newDate)
    }

    const decrementWeek = () => {
        var newDate = new Date(selectedDay);
        newDate.setDate(selectedDay.getDate() - 7);
        onDateSelect(newDate)
    }

    const incrementWeek = () => {
        var newDate = new Date(selectedDay);
        newDate.setDate(selectedDay.getDate() + 7);
        onDateSelect(newDate)
    }

    const generateMonthOptions = () => {
        if (!monthOptions?.length) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
            const menu = months?.map((month: any) => {
                return (
                    {
                        value: month,
                        label: month,
                    }
                )
            })  || []
            setMonthOptions(menu)
        }
    }

    const generateYearOptions = () => {
        if (!yearOptions?.length) {
            const yrs = generateArrayOfYears()
            const menu = yrs?.map((yr: any) => {
                return (
                    {
                        value: yr,
                        label: yr,
                    }
                )
            })  || []
            setYearOptions(menu)
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

    useEffect(() => {
        generateMonthOptions()
        generateYearOptions()
    }, [])

    return (
        <>
            <div className="calendar-header pt-1">
                <div className="calendar-header-left">
                    {/* <div className='date-display-area'>
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
                    </div> */}
                </div>

                <div className="calendar-header-right">
                    <div className='date-selector-area'>
                        {
                            activeTimeframe === "tf-week" ? (
                                <div 
                                    className='week-date-select-wrapper'
                                    style={{
                                        position: 'relative',
                                         
                                    }}
                                >
                                    <div className='flex mr-4' >
                                        <div className='mr-1'>
                                            <LeftOutlined
                                                onClick={() => decrementWeek()}
                                            />
                                        </div>
                                        <div>
                                            {`${
                                                new Date(
                                                    selectedDay?.getFullYear(), 
                                                    selectedDay?.getMonth(), 
                                                    selectedDay?.getDate()-selectedDay?.getDay()
                                                ).toLocaleDateString()
                                            }`} 
                                            - 
                                            {`${
                                                new Date(
                                                    selectedDay?.getFullYear(), 
                                                    selectedDay?.getMonth(), 
                                                    selectedDay?.getDate()+(6-selectedDay?.getDay())
                                                ).toLocaleDateString()
                                            }`} 
                                        </div>
                                        <div  className='ml-1'>
                                            <RightOutlined
                                                onClick={() => incrementWeek()}
                                            />
                                        </div>
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
                                        <Select 
                                            onChange={onSelectedMonthChange}
                                            value={selectedMonth}
                                            options={monthOptions}
                                        />
                                    </div>
                                    <div className='year-select ml-1'>
                                        <Select 
                                            onChange={onSelectedYearChange}
                                            value={selectedYear}
                                            options={yearOptions}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        {
                            activeTimeframe === "tf-year" ? (
                                <div className='year-select'>
                                    <Select 
                                        onChange={onSelectedYearChange}
                                        value={selectedYear}
                                        options={yearOptions}
                                    />
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <Radio.Group onChange={(e) => onTimeframeSelect(e?.target?.value)} defaultValue="tf-month">
                        <Radio.Button value="tf-week">Week</Radio.Button>
                        <Radio.Button value="tf-month">Month</Radio.Button>
                        <Radio.Button value="tf-year">Year</Radio.Button>
                    </Radio.Group>
                </div>

            </div>
        </>
    )
}

