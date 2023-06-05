import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Button } from 'antd'
import { DownOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import intakeActions from '../../../redux/actions/intake'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'



export default function IntakeCard() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userIntakes = useSelector((state: any) => state.intakes?.queryResult ?? [])
    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [intakesForSelectedDate, setIntakesForSelectedDate] = useState<any>()
    const [intakeRows, setIntakeRows] = useState<any>()

        
    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }

    useEffect(() => {
        store.dispatch(intakeActions.setIntakes(currentUser?._id))
    }, [currentUser])

    useEffect(() => {
        console.log('userIntakes', userIntakes)
        const currentIntakes = userIntakes?.filter((intake: any) => {
            return datesMatch(new Date(intake?.time), selectedDay)
        })
        setIntakesForSelectedDate(currentIntakes)
    }, [userIntakes])

    const triggerNewIntake = () => {
        store.dispatch(widgetActions.showIntakeWidget())
    }



    interface IntakeRowProps {
        intakeData?: any
    }
    
    function IntakeRow(props: IntakeRowProps) {

        const [isRowCollapsed, setIsRowCollapsed] = useState<any>(true)

        return (
            <div key={`${props?.intakeData?.id}`} className='brdr-b pl-2 pr-2 flex jc-sb'>
                <div className='flex'>
                    <div>
                        {
                            isRowCollapsed
                            ? (
                                <RightOutlined onClick={() => setIsRowCollapsed(false)}/>
                            )
                            : (
                                <DownOutlined  onClick={() => setIsRowCollapsed(true)}/>
                            )
                        }
                    </div>
                    <div className='ml-1'>
                        {props?.intakeData?.title}
                    </div>
                </div>
                <div className='flex'>
                    <div className='mr-1'>
                        calories
                    </div>
                    <div className='mr-1'>
                        protein
                    </div>
                    <div className='mr-1'>
                        carbs
                    </div>
                    <div className='mr-1'>
                        fat
                    </div>
                </div>
            </div>
        )
    }


    useMemo(() => {
        console.log('intakesForSelectedDate', intakesForSelectedDate)

        const rows = intakesForSelectedDate?.map((intake: any) => {

            return (
                <IntakeRow intakeData={intake} key={`${intake?.id}`}/>
            )
        }) || []
        setIntakeRows(rows)
    }, [intakesForSelectedDate])





    return (
        <div>
            <div className='flex jc-sb p-2'>
                <div>
                    <h5>Nutrient Intakes:</h5>
                </div>
                <div>
                    <Button onClick={() => triggerNewIntake()} size='small'>
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div>
                {intakeRows}
            </div>
        </div>
    )
}