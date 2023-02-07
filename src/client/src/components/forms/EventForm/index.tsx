import { ObjectID } from 'bson'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { eventCategories } from '../../../data/eventCategories'
import eventActions from '../../../redux/actions/event'
import { store } from '../../../redux/store'
import './styles.css'

type Props = {
    existingEvent?: any
    formOperation?: any
    eventParent?: any
    onFinishAction?: any
}


export const EventForm : React.FC<Props> = ({
    existingEvent,
    formOperation,
    eventParent,
    onFinishAction
}) => {


    const [formValues, setFormValues] = useState<any>({})
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

    const handleEventInfoChange = (value : any, field: any) => {
        let workingObj = formValues
        workingObj[field] = value
        setFormValues(workingObj)
    }

    const onFinish = (data: any) => {
        data.preventDefault()

        let eventStartTime;
        let eventEndTime;

        if (formOperation == 'add') {
            
            eventStartTime = `${formValues?.eventDate}T${formValues?.startTime}:00.000+00:00`
            eventEndTime = `${formValues?.eventDate}T${formValues?.endTime}:00.000+00:00`
            
            const dto = {
                id: new ObjectID().toString(),
                title: formValues?.title,
                description: formValues?.description,
                parent: eventParent ? eventParent : '',
                category: formValues?.category,
                startTime: eventStartTime,
                endTime: eventEndTime,
                createdByUserId : currentUser._id,
            }

            store.dispatch(eventActions.add(dto))
            if (onFinishAction) {
                onFinishAction()
            }

        } else if (formOperation == 'edit') {

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



    useEffect(() => {
        if (existingEvent) {

            let eventDate = existingEvent?.startTime?.split('T')[0]
            let eventStartTime = existingEvent?.startTime?.split('T')[1].slice(0,5)
            let eventEndTime = existingEvent?.endTime.split('T')[1].slice(0,5)

            setFormValues(existingEvent)
            let formTitle : any = document?.getElementById('event-form-title')
            let formDescription : any = document?.getElementById('event-form-description')
            let formCategory : any = document?.getElementById('event-form-category')
            let formEventDate : any = document?.getElementById('event-form-eventDate')
            let formStartTime : any = document?.getElementById('event-form-startTime')
            let formEndTime : any = document?.getElementById('event-form-endTime')

            formTitle.value = existingEvent?.title
            formDescription.value = existingEvent?.description
            formCategory.value = existingEvent?.category
            formEventDate.value = eventDate
            formStartTime.value = eventStartTime
            formEndTime.value = eventEndTime
        }

        let existing = {
            id: existingEvent?.id,
            title : existingEvent?.title,
            description: existingEvent?.description,
            category: existingEvent?.category,
            eventDate: existingEvent?.startTime.split('T')[0],
            startTime: existingEvent?.startTime.split('T')[1],
            endTime: existingEvent?.endTime.split('T')[1]
        }

        setFormValues(existing)

    }, [existingEvent])


    return (
        <div>
            <form 
                onSubmit={onFinish}
                className='evt-form'
            >
                <div className='title-description-category-row'>
                    <div className="input-div-30">
                        <input
                            name="title"
                            id="event-form-title"
                            type="text"
                            placeholder='Event Title'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'title')}
                            className='mr-1 text-field'
                        />
                    </div>
                    <div className="input-div-50">
                        <input
                            name="description"
                            id="event-form-description"
                            type="text"
                            placeholder='Event Description'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'description')}
                            className='mr-1 text-field'
                        />
                    </div>
                    <div className="input-div-20">
                        <select 
                            name={'category'}
                            id='event-form-category'
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'category')}
                            data-select
                            className='select-field'
                        >
                            {categoryOptions}
                        </select>
                    </div>
                </div>
                <div className='date-and-time-row'>
                    <div className="input-div-40">
                        <input 
                            type="date" 
                            id="event-form-eventDate" 
                            name="eventDate"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'eventDate')}
                            className='form-input'
                        />
                    </div>
                    <div className="input-div-30">
                        <input 
                            type="time" 
                            id="event-form-startTime" 
                            name="startTime"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'startTime')}
                            className='form-input'
                            required
                        />
                    </div>
                    <div className="input-div-30">
                        <input 
                            type="time" 
                            id="event-form-endTime" 
                            name="endTime"
                            onChange={(e) => handleEventInfoChange(e?.target?.value, 'endTime')}
                            className='form-input'
                            required
                        />
                    </div>
                </div>
                <div className="flex space-between">
                    <button className="submit-evt" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}