import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Button, Dropdown, Progress, Tag } from 'antd'
import type {MenuProps} from 'antd'
import { CheckOutlined, CloseCircleOutlined, DownOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import intakeActions from '../../../redux/actions/intake'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'



interface IntakeCardProps {
    selectedDate?: any 
}

export default function IntakeCard(props: IntakeCardProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userIntakes = useSelector((state: any) => state.intakes?.queryResult ?? [])
    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [intakesForSelectedDate, setIntakesForSelectedDate] = useState<any>()
    const [intakeRows, setIntakeRows] = useState<any>()
    const [nutrientTotals, setNutrientTotals] = useState<any>()
    const [consumedTotals, setConsumedTotals] = useState<any>()


    useEffect(() => {
        if (props.selectedDate) {
            setSelectedDay(props.selectedDate)
        }
    }, [props?.selectedDate])
        
    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }

    useEffect(() => {
        store.dispatch(intakeActions.setIntakes(currentUser?._id))
    }, [currentUser])

    useEffect(() => {
        const currentIntakes = userIntakes?.filter((intake: any) => {
            return datesMatch(new Date(intake?.time), selectedDay)
        })
        setIntakesForSelectedDate(currentIntakes)
    }, [userIntakes, props?.selectedDate, selectedDay])

    useMemo(() => {
        // When intakesForSelectedDate updates, recalculate the nutrient totals
        const intakeNutrients = intakesForSelectedDate?.map((intake:any) => {

            return (
                {
                    intakeCalories: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.calories)),
                    intakeProtein: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.protein)),
                    intakeCarbs: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.carbs)),
                    intakeFat: sumArrayElements(intake?.ingredients?.map((intake: any) => intake?.fat)),
                    hasBeenConsumed: intake?.hasBeenConsumed,
                }
            )
        }) || []

        setNutrientTotals({
            calories: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeCalories)),
            protein: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeProtein)),
            carbs: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeCarbs)),
            fat: sumArrayElements(intakeNutrients?.map((intake: any) => intake?.intakeFat)),
        })

        const alreadyConsumed = intakeNutrients?.filter((intake: any) => intake?.hasBeenConsumed)

        setConsumedTotals({
            calories: sumArrayElements(alreadyConsumed?.map((intake: any) => intake?.intakeCalories)),
            protein: sumArrayElements(alreadyConsumed?.map((intake: any) => intake?.intakeProtein)),
            carbs: sumArrayElements(alreadyConsumed?.map((intake: any) => intake?.intakeCarbs)),
            fat: sumArrayElements(alreadyConsumed?.map((intake: any) => intake?.intakeFat)),
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

        const markIntakeConsumed = (intakeID: any) => {
            console.log('marking completed:', intakeID)

            const workingObj = {...props?.intakeData}
            console.log(workingObj)

            workingObj.hasBeenConsumed = true
            store.dispatch(intakeActions.update(intakeID, workingObj))
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
                key: '1',
                label: (
                    <a onClick={() => editIntake(props?.intakeData?.id)}>
                        Edit item
                    </a>
                ),
                icon: <EditOutlined />
            },
            {
                key: '2',
                label: (
                    <a onClick={() => markIntakeConsumed(props?.intakeData?.id)}>
                        Mark Intake Consumed
                    </a>
                ),
                icon: <CheckOutlined />
            },
            {
                key: '3',
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
                    <div 
                        className='flex'
                        style={{
                            display: 'flex',
                            height: '30px',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            {
                                props?.intakeData?.hasBeenConsumed
                                ? (
                                    <Tag 
                                        color="green" 
                                        className='complete-tag'
                                        style={{
                                            borderRadius: '10px',
                                            height: '20px',
                                            width: '20px',
                                            display:'flex'
                                        }}
                                    > </Tag>
                                )
                                : null
                            }
                            {
                                !props?.intakeData?.hasBeenConsumed
                                ? (
                                    <Tag 
                                        className='incomplete-tag'
                                        color="default" 
                                        style={{
                                            borderRadius: '10px',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                    > </Tag>
                                )
                                : null
                            }
                        </div>
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
            <div className='divider mb-1'/>
            <div>
                {intakeRows}
            </div>
            <div className='flex jc-sb pl-2 pr-2 mt-1'>
                <div>
                    <h5>Total Planned Nutrients:</h5>
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
            <div className='flex jc-sb pl-2 pr-2'>
                <div>
                    <h5>Total Consumed Nutrients:</h5>
                </div>
                <div className='flex'>
                    <div className='mr-1'>
                        {consumedTotals?.calories}
                    </div>
                    <div className='mr-1'>
                        {consumedTotals?.protein}
                    </div>
                    <div className='mr-1'>
                        {consumedTotals?.carbs}
                    </div>
                    <div className='mr-1'>
                        {consumedTotals?.fat}
                    </div>
                </div>
            </div>
            <div className='flex jc-sb pl-2 pr-2'>
                <div className='w-30'>
                    <h5 className='whitespace-nw'>Planned Calories:</h5>
                </div>
                <div className='w-70'>
                    <Progress 
                        size="small" 
                        percent={Math.round((consumedTotals?.calories/nutrientTotals?.calories) * 100)} 
                        status={Math.round((consumedTotals?.calories/nutrientTotals?.calories) * 100) !== 100 ? "active" : undefined }
                    />
                </div>
            </div>
            <div className='flex jc-sb pl-2 pr-2'>
                <div className='w-30'>
                    <h5 className='whitespace-nw'>Planned Protein:</h5>
                </div>
                <div className='w-70'>
                    <Progress 
                        size="small" 
                        percent={Math.round((consumedTotals?.protein/nutrientTotals?.protein) * 100)} 
                        status={Math.round((consumedTotals?.protein/nutrientTotals?.protein) * 100) !== 100 ? "active" : undefined }
                    />
                </div>
            </div>
            <div className='flex jc-sb pl-2 pr-2'>
                <div className='w-30'>
                    <h5 className='whitespace-nw'>Planned Carbs:</h5>
                </div>
                <div className='w-70'>
                    <Progress 
                        size="small" 
                        percent={Math.round((consumedTotals?.carbs/nutrientTotals?.carbs) * 100)} 
                        status={Math.round((consumedTotals?.carbs/nutrientTotals?.carbs) * 100) !== 100 ? "active" : undefined }
                    />
                </div>
            </div>
            <div className='flex jc-sb pl-2 pr-2'>
                <div className='w-30'>
                    <h5 className='whitespace-nw'>Planned Fat:</h5>
                </div>
                <div className='w-70'>
                    <Progress 
                        size="small" 
                        percent={Math.round((consumedTotals?.fat/nutrientTotals?.fat) * 100)} 
                        status={Math.round((consumedTotals?.fat/nutrientTotals?.fat) * 100) !== 100 ? "active" : undefined }
                    />
                </div>
            </div>
        </div>
    )
}