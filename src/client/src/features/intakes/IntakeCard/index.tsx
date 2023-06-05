import React, { useEffect } from 'react'
import './styles.css'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import intakeActions from '../../../redux/actions/intake'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'



export default function IntakeCard() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userIntakes = useSelector((state: any) => state.intakes?.queryResult ?? [])

    useEffect(() => {
        store.dispatch(intakeActions.setIntakes(currentUser?._id))
    }, [currentUser])


    const triggerNewIntake = () => {
        store.dispatch(widgetActions.showIntakeWidget())
    }

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
                body
            </div>
        </div>
    )
}