import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Button, Dropdown } from 'antd'
import type {MenuProps} from 'antd'
import { CloseCircleOutlined, DownOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
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
    const [nutrientTotals, setNutrientTotals] = useState<any>()


        
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

    useMemo(() => {
        // When intakesForSelectedDate updates, recalculate the nutrient totals
        const intakeNutrients = intakesForSelectedDate?.map((intake:any) => {

            return (
                {
                    intakeCalories: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.calories)),
                    intakeProtein: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.protein)),
                    intakeCarbs: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.carbs)),
                    intakeFat: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.fat)),
                }
            )
        }) || []

        setNutrientTotals({
            calories: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeCalories)),
            protein: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeProtein)),
            carbs: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeCarbs)),
            fat: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeFat)),
        })

    }, [intakesForSelectedDate])


    const triggerNewIntake = () => {
        store.dispatch(widgetActions.showIntakeWidget())
    }

    function sumArrayElements(arr: any) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i], 10);
        }
        return sum;
    }


    interface IntakeRowProps {
        intakeData?: any
    }
    
    function IntakeRow(props: IntakeRowProps) {

        const [isRowCollapsed, setIsRowCollapsed] = useState<any>(true)
        const [ingredientRows, setIngredientRows] = useState<any>()
        const [intakeInformation, setIntakeInformation] = useState<any>()


        const editIntake = (intakeID: any) => {
            console.log('editing:', intakeID)
        }
        
        const deleteIntake = (intakeID: any) => {
            console.log('deleting:', intakeID)
            store.dispatch(intakeActions.delete(intakeID))
        }

        useMemo(() => {

            const intakeCalories = sumArrayElements(props?.intakeData?.ingredients?.map((intake: any) => intake?.calories))
            const intakeProtein = sumArrayElements(props?.intakeData?.ingredients?.map((intake: any) => intake?.protein))
            const intakeCarbs = sumArrayElements(props?.intakeData?.ingredients?.map((intake: any) => intake?.carbs))
            const intakeFat = sumArrayElements(props?.intakeData?.ingredients?.map((intake: any) => intake?.fat))

            setIntakeInformation({
                intakeCalories,
                intakeProtein,
                intakeCarbs,
                intakeFat
            })


            const iRows = props?.intakeData?.ingredients?.map((iData: any) => {
                return (
                    <div className='flex jc-sb'>
                        <div>
                            {iData?.title}
                        </div>
                        <div className='flex'>
                            <div className='mr-1'>
                                {iData?.calories}
                            </div>
                            <div className='mr-1'>
                                {iData?.protein}
                            </div>
                            <div className='mr-1'>
                                {iData?.carbs}
                            </div>
                            <div className='mr-1'>
                                {iData?.fat}
                            </div>
                        </div>
                    </div>
                )
            }) || []
            
            setIngredientRows(iRows)

        }, [props?.intakeData])

        const items: MenuProps['items'] = [
            {
                key: '4',
                label: (
                    <a onClick={() => editIntake(props?.intakeData?.id)}>
                        Edit item
                    </a>
                ),
                icon: <EditOutlined />
            },
            {
                key: '5',
                label: (
                    <a onClick={() => deleteIntake(props?.intakeData?.id)}>
                        Delete item
                    </a>
                ),
                icon: <CloseCircleOutlined />
            },
        ];

        return (
            <div key={`${props?.intakeData?.id}`} className='brdr-b pl-2 pr-2 '>
                <div className='flex jc-sb'>
                    <div className='flex'>
                        <div>
                            {new Date(props?.intakeData?.time)?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
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
                            {intakeInformation?.intakeCalories}
                        </div>
                        <div className='mr-1'>
                            {intakeInformation?.intakeProtein}
                        </div>
                        <div className='mr-1'>
                            {intakeInformation?.intakeCarbs}
                        </div>
                        <div className='mr-1'>
                            {intakeInformation?.intakeFat}
                        </div>
                        <div className='ml-3'>
                            <Dropdown menu={{ items }} placement="bottomLeft">
                                <Button size='small'>
                                    <DownOutlined/>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        isRowCollapsed
                        ? (
                            null
                        )
                        : ( // TODO: Ingredient row rendering
                            <div className='ml-4'>
                                {ingredientRows}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }


    useMemo(() => {
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
            <div className='flex jc-sb pl-2 pr-2'>
                <div>
                    Nutrient Totals Footer
                </div>
                <div className='flex'>
                    <div className='mr-1'>
                        {nutrientTotals?.calories}
                    </div>
                    <div className='mr-1'>
                        {nutrientTotals?.protein}
                    </div>
                    <div className='mr-1'>
                        {nutrientTotals?.carbs}
                    </div>
                    <div className='mr-1'>
                        {nutrientTotals?.fat}
                    </div>
                </div>
            </div>
        </div>
    )
}