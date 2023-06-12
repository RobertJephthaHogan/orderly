import { SaveOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import noteActions from '../../../redux/actions/notes'




interface NoteEditorProps {
    mode?: any
    defaultSubject?:any
}

export default function NoteEditor(props: NoteEditorProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [editorMode, setEditorMode] = useState<any>(props?.mode === 'editing' ? 'edit': 'add')
    const [editingSubject, setEditingSubject] = useState<any>({})
    const [categoryOptions, setCategoryOptions] = useState<any>([])

    const { TextArea } = Input;
    
    useEffect(() => {
        store.dispatch(noteActions.setNotes(currentUser?._id))
    }, [currentUser])

    const onFormChange = (value: any, field: string) => {
        console.log(value, field)
        const workingObj = {...editingSubject}
        workingObj[field] = value
        setEditingSubject(workingObj)
    }

    const onSubmit = () => {
        //TODO: Handling for when user submits new note
    }

    const onSave = () => {
        //TODO: Handling for when user saves existing note
    }

    const onSelectCategory = (data: string) => {
        console.log('onSelectCategory', data)
        onFormChange(data, 'category')
    }

    const onChangeCategory = (data: string) => {
        console.log('onChangeCategory', data)
        onFormChange(data, 'category')
    }

    const onSearchCategory = (data: string) => {
        console.log('onSearchCategory', data)
        onFormChange(data, 'category')

        const options : any= []

        userNotes?.forEach((note: any) => {

            const searchObj = {
                label: note?.category,
                value: note?.category,
            }

            const found = options.some((item: any) => item.value === searchObj.value && item.label === searchObj.label);

            if (!found) {
                options.push(
                    {
                        label: note?.category,
                        value: note?.category,
                    }
                )
            }
        })
        options.push({
            label: data,
            value: data,
        })
        console.log('options', options)
        setCategoryOptions(options)
    }


    console.log('editingSubject', editingSubject)

    return (
        <div>
            <div className='flex '>
                <div className='w-60 p-1'>
                    <Input
                        placeholder='Title'
                        size='small'
                        onChange={(e) => onFormChange(e?.target?.value, 'title')}
                        value={editingSubject?.title}
                    />
                </div>
                <div className='w-30 p-1'>
                    {/* <Select
                        placeholder='Category'
                        size='small'
                        className='w-100'
                        onChange={(e) => onFormChange(e?.target?.value, 'category')}
                    /> */}
                    <AutoComplete
                        value={editingSubject?.category}
                        options={categoryOptions}
                        onSelect={onSelectCategory}
                        onSearch={onSearchCategory}
                        onChange={onChangeCategory}
                        placeholder="control mode"
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
                <TextArea 
                    rows={4} 
                    onChange={(e) => onFormChange(e?.target?.value, 'body')}
                />
            </div>
            {
                editorMode === 'add'
                ? (
                    <div className='w-100 p-1'>
                        <Button className='w-100'>
                            Create New Note
                        </Button>
                    </div>
                )
                : null
            }
        </div>
    )
}