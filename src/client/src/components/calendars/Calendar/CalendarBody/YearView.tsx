import React from 'react'


interface Props {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}



const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

export default function YearView(props : Props) {

    console.log('props.selectedDay', props.selectedDay)

    return (
        <div className="year-view-wrapper">
            <div className="year-view" >
                {/* <div className='year-view-row'>
                    <div className='month-cell'>
                        January
                    </div>
                    <div className='month-cell'>
                        February
                    </div>
                    <div className='month-cell'>
                        March
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        April
                    </div>
                    <div className='month-cell'>
                        May
                    </div>
                    <div className='month-cell'>
                        June
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        July
                    </div>
                    <div className='month-cell'>
                        August
                    </div>
                    <div className='month-cell'>
                        September
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        October
                    </div>
                    <div className='month-cell'>
                        November
                    </div>
                    <div className='month-cell'>
                        December
                    </div>
                </div> */}
                <div>
                    <MonthCellRender
                        selectedDay={props.selectedDay}
                    />
                </div>
            </div>
        </div>
    )
}


interface MonthCellRenderProps {
    selectedDay?: any
}

function MonthCellRender(props: MonthCellRenderProps) {

    const arr = Array.from({ length: 12 }, (_, index) => index);

    const cells = arr?.map((entry: any) => {

        const year = props.selectedDay?.getFullYear()
        const month = entry 

        const date = new Date(year, month)

        console.log('date', date)

        return (
            <div  className='month-cell'>
                {monthNames[entry]}
            </div>
        )
    }) || []

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)'
            }}
        >
            {cells}
        </div>
    )
}