import { Button, DatePicker, Input, Select, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { eventCategories } from '../../../data/eventCategories'



interface EventFormProps {
    existingEvent?: any
    formOperation?: any
    eventParent?: any
    onFinishAction?: any
}


export default function NewEventForm(props: EventFormProps) {

    const [formValues, setFormValues] = useState<any>({})
    const [categoryOptions, setCategoryOptions] = useState<any>()
    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    // useEffect(() => {
    //     if (!categoryOptions?.length) {
    //        const menu = eventCategories?.map((child: any) => {
    //            return (
    //                <option key={child.label} value={child.label}>{child.label}</option>
    //            )
    //        })  || []
    //        setCategoryOptions(menu)
    //     }   
    // }, [])

    const handleEventInfoChange = (value : any, field: any) => {
        let workingObj = formValues
        workingObj[field] = value
        setFormValues(workingObj)
    }

    const onFinish = (value: any) => {
        console.log('value', value)
    }

    return (
        <div>
            <form 
                onSubmit={onFinish}
                className='evt-form'
            >
                <div className='title-description-category-row'>
                    <div className="input-div-30">
                        {/* <input
                            name="title"
                            id="event-form-title"
                            type="text"
                            placeholder='Event Title'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'title')}
                            className='mr-1 text-field'
                        /> */}
                        <Input
                            name="title"
                            id="event-form-title"
                            type="text"
                            placeholder='Event Title'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'title')}
                            className='mr-1 text-field'
                        />
                    </div>
                    <div className="input-div-50">
                        {/* <input
                            name="description"
                            id="event-form-description"
                            type="text"
                            placeholder='Event Description'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'description')}
                            className='mr-1 text-field'
                        /> */}
                        <Input
                            name="description"
                            id="event-form-description"
                            type="text"
                            placeholder='Event Description'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'description')}
                            className='mr-1 text-field'
                        />
                    </div>
                    <div className="input-div-20">
                        <Select 
                            className='w-100' 
                            options={eventCategories}
                            defaultValue="General"
                        />
                    </div>
                </div>
                <div className='date-and-time-row'>
                    <div className="input-div-40">
                        {/* <input 
                            type="date" 
                            id="event-form-eventDate" 
                            name="eventDate"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'eventDate')}
                            className='form-input'
                        /> */}
                        <DatePicker
                            className='w-100'
                        />
                    </div>
                    <div className="input-div-30">
                        {/* <input 
                            type="time" 
                            id="event-form-startTime" 
                            name="startTime"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'startTime')}
                            className='form-input'
                            required
                        /> */}
                        <TimePicker
                            className='w-100'
                        />
                    </div>
                    <div className="input-div-30">
                        {/* <input 
                            type="time" 
                            id="event-form-endTime" 
                            name="endTime"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'endTime')}
                            className='form-input'
                            required
                        /> */}
                        <TimePicker
                            className='w-100'
                        />
                    </div>
                </div>
                <div className="flex space-between">
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
            </form>
        </div>
    )
}