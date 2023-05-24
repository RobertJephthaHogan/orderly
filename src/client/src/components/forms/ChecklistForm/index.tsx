import { Button, Input, Select } from 'antd'
import { ObjectID } from 'bson'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'




export default function ChecklistForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>({})


    const onChange = (value: any, field: any) => {
        console.log(value)
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log(workingObj)
        setFormValues(workingObj)
    }

    const onFinish = () => {
        console.log('onFinish')

        const dto = {...formValues}
        dto['id'] = new ObjectID().toString()
        dto['parent'] = ''
        dto['createdByUserId'] = currentUser?._id
        dto['items'] = []
        dto['checklistCreationTime'] = new Date().toJSON()

        console.log('dto', dto)

        store.dispatch(checklistActions.add(dto))

    }

    return (
        <div>
            <div className='p-1'>
                <h3 className='brdr-b'>Create New Checklist</h3>
            </div>
            <div className='p-1'>
                <Input 
                    placeholder='Title'
                    onChange={(e) => onChange(e?.target?.value, 'title')}
                />
            </div>
            <div className='p-1'>
                <Input 
                    placeholder='Category'
                    onChange={(e) => onChange(e?.target?.value, 'category')}
                />
            </div>
            <div className='p-2'>
                <Button 
                    className='w-100'
                    onClick={onFinish}
                >
                    Create Checklist
                </Button>
            </div>
        </div>
    )
}