import React from 'react'


interface Props {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}


export default function YearView(props : Props) {

    return (
        <div className="year-view-wrapper">
            <div className="year-view" >
                <div className='year-view-row'>
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
                </div>
            </div>
        </div>
    )
}
