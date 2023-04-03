
import { useEffect, useState } from 'react'



type Props = {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}


const WeekView : React.FC<Props> = ({
    selectedDay,
    events
}) => {

    const [weekViewData, setWeekViewData] = useState<any>()
    const [wv, setWv] = useState<any>([]) 

    


    useEffect(() => {
        if (!wv?.length) {

            generateWeekViewData()

        }
    })


    const generateWeekViewData = () => {
        const dayOfWeek = selectedDay.getDay()
        let thisWeeksDays = []
        let yesterday = new Date();

        if (dayOfWeek === 0) {
            thisWeeksDays.push(selectedDay)

            for (let i = 1; i < 7; i++) {
                let tomorrow = new Date();
                tomorrow.setDate(selectedDay.getDate() + i)
                thisWeeksDays.push(tomorrow)
            }

            setWv(thisWeeksDays)
        } else if (dayOfWeek === 6) {

        }  else {

        }

    }


    const getDaysBefore = () => {

    }

    const getDaysAfter = () => {
        
    }



    return (
        <div className="week-view-wrapper">
            Week View!
            <div className="week-view" >
                <div className='week-view-body'>
                    {
                        wv?.map((day:any) => {
                            return (
                                <div className='w-100 bordered'>
                                    {/* {day.toString()} */}
                                    {day.getDate().toString()}
                                </div>
                            )
                        }) || []
                    }
                </div>
            </div>
        </div>
    )
}


export default WeekView