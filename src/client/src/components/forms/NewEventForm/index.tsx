import { UndoOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Select, TimePicker } from 'antd'
import { ObjectID } from 'bson'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { eventCategories } from '../../../data/eventCategories'
import eventActions from '../../../redux/actions/event'
import { store } from '../../../redux/store'
import './styles.css'


interface EventFormProps {
    existingEvent?: any
    formOperation?: any
    eventParent?: any
    onFinishAction?: any
    setEvent?: any
}


export default function NewEventForm(props: EventFormProps) {

    const [formValues, setFormValues] = useState<any>({category: 'General' })
    const [categoryOptions, setCategoryOptions] = useState<any>()
    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    

    useEffect(() => {
        if (!categoryOptions?.length) {
           const menu = eventCategories?.map((child: any) => {
               return (
                   <option key={child.label} value={child.label}>{child.label}</option>
               )
           })  || []
           setCategoryOptions(menu)
        }   
    }, [])

    useEffect(() => {
        if(!formValues?.category) {
            setFormValues({...formValues, category: 'General'})
        }
    })

    console.log('formValues', formValues)

    const handleEventInfoChange = (value : any, field: any) => {
        console.log('value', value)
        console.log('field', field)
        let workingObj = {...formValues}
        workingObj[field] = value
        setFormValues(workingObj)
    }


    useEffect(() => {
        setFormValues(props.existingEvent)
    }, [props.existingEvent])


    const onReset = () => {
        props.setEvent(null)
    }


    const onFinish = (data: any) => {
        data.preventDefault()

        let eventStartTime;
        let eventEndTime;

        if (props.formOperation == 'add') {
            
            eventStartTime = `${formValues?.eventDate}T${formValues?.startTime?.split('T')[1]}`
            eventEndTime = `${formValues?.eventDate}T${formValues?.endTime?.split('T')[1]}`
            
            const dto = {
                id: new ObjectID().toString(),
                title: formValues?.title,
                description: formValues?.description,
                parent: props.eventParent ? props.eventParent : '',
                category: formValues?.category,
                startTime: eventStartTime,
                endTime: eventEndTime,
                createdByUserId : currentUser._id,
            }

            console.log('dto', dto)

            store.dispatch(eventActions.add(dto))
            if (props.onFinishAction) {
                props.onFinishAction()
            }

        } else if (props.formOperation == 'edit') {

            eventStartTime = `${formValues?.eventDate}T${formValues?.startTime}`
            eventEndTime = `${formValues?.eventDate}T${formValues?.endTime}`

            const dto = {
                id: formValues?.id,
                title: formValues?.title,
                description: formValues?.description,
                parent: formValues?.parent,
                category: formValues?.category,
                startTime: eventStartTime,
                endTime: eventEndTime,
                createdByUserId : currentUser._id,
            }

            store.dispatch(eventActions.update(dto.id, dto))

        } 

    }

    return (
        <div>
            <form 
                onSubmit={onFinish}
                className='evt-form'
            >
                <div className='title-description-category-row'>
                    <div className="input-div-30">
                        <Input
                            name="title"
                            id="event-form-title"
                            type="text"
                            placeholder='Event Title'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'title')}
                            className='mr-1 text-field'
                            value={formValues?.title}
                        />
                    </div>
                    <div className="input-div-50">
                        <Input
                            name="description"
                            id="event-form-description"
                            type="text"
                            placeholder='Event Description'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'description')}
                            className='mr-1 text-field'
                            value={formValues?.description}
                        />
                    </div>
                    <div className="input-div-20">
                        {/* <Select 
                            className='w-100' 
                            options={eventCategories}
                            //optionFilterProp="label"
                            onChange={(e) => console.log(e)}
                            //onChange={(e) => handleEventInfoChange(e , 'category')}
                            //defaultValue="General"
                            //value={formValues?.category}
                        /> */}
                        <select 
                            name={'category'}
                            id='event-form-category'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'category')}
                            data-select
                            className='select-field'
                            value={formValues?.category}
                            defaultValue={formValues?.category}
                        >
                            {categoryOptions}
                        </select>
                    </div>
                </div>
                <div className='date-and-time-row'>
                    <div className="input-div-40">
                        <DatePicker
                            className='w-100'
                            status={!formValues?.eventDate ? 'error' : ''}
                            value={moment(formValues?.eventDate)}
                            onChange={(e: any) => handleEventInfoChange(new Date(e).toISOString().split('T')[0], 'eventDate')}
                        />
                    </div>
                    <div className="input-div-30">
                        <TimePicker
                            className='w-100'
                            status={!formValues?.startTime ? 'error' : ''}
                            value={moment(formValues?.startTime)}
                            use12Hours
                            onChange={(e: any) => handleEventInfoChange(new Date(e).toISOString(), 'startTime')}
                        />
                    </div>
                    <div className="input-div-30">
                        <TimePicker
                            className='w-100'
                            value={moment(formValues?.endTime)}
                            status={!formValues?.endTime ? 'error' : ''}
                            use12Hours
                            onChange={(e: any) => handleEventInfoChange(new Date(e).toISOString(), 'endTime')}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className='w-100 flex'>
                        <div className='w-90 flex'>
                            <Button 
                                className="submit-evt" 
                                onClick={onFinish}
                            >
                                {
                                    props.formOperation == 'add'
                                    ? 'Submit New'
                                    : 'Submit Edit'
                                }
                            </Button>
                        </div>
                        <div className='w-10 flex'>
                            <Button 
                                className="submit-evt" 
                                onClick={onReset}
                            >
                                <UndoOutlined/>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}