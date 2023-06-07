import { SaveOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import React, { useState } from 'react'




interface NoteEditorProps {
    mode?: any
    defaultSubject?:any
}

export default function NoteEditor(props: NoteEditorProps) {

    const [editingSubject, setEditingSubject] = useState<any>({})

    const { TextArea } = Input;


    // ToDo: Title Input
    // ToDo Conditional Save button
    // ToDo Conditional Category Select
    // ToDo Text Area

    const onFormChange = (value: any, field: string) => {
        console.log(value, field)
        const workingObj = {...editingSubject}
        workingObj[field] = value
        setEditingSubject(editingSubject)
    }

    return (
        <div>
            <div className='flex '>
                <div className='w-60 p-1'>
                    <Input
                        placeholder='Title'
                        size='small'
                        onChange={(e) => onFormChange(e?.target?.value, 'title')}
                    />
                </div>
                <div className='w-30 p-1'>
                    <Select
                        placeholder='Category'
                        size='small'
                        className='w-100'
                    />
                </div>
                <div className='w-10  p-1'>
                    <Button size='small'>
                        <SaveOutlined/>
                    </Button>
                </div>
            </div>
            <div className='p-1'>
                <TextArea rows={4} />
            </div>
        </div>
    )
}