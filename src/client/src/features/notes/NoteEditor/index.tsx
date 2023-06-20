import { SaveOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import noteActions from '../../../redux/actions/notes'
import { ObjectID } from 'bson'




interface NoteEditorProps {
    mode?: any
    defaultSubject?:any
}

export default function NoteEditor(props: NoteEditorProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [editorMode, setEditorMode] = useState<any>(props?.mode === 'edit' ? 'edit': 'add')
    const [editingSubject, setEditingSubject] = useState<any>({})
    const [categoryOptions, setCategoryOptions] = useState<any>([])

    const { TextArea } = Input;
    
    useEffect(() => {
        store.dispatch(noteActions.setNotes(currentUser?._id))
    }, [currentUser])

    useEffect(() => {
        if (props.defaultSubject) {
            // find props.defaultSubject id in userNotes
            const found = userNotes.find((note: any) => note?.id === props.defaultSubject)
            console.log('found', found)
            // set it as editingSubject?
            setEditingSubject(found)
        }
    }, [props.defaultSubject])

    const onFormChange = (value: any, field: string) => {
        console.log(value, field)
        const workingObj = {...editingSubject}
        workingObj[field] = value
        setEditingSubject(workingObj)
    }

    const onSubmit = () => {
        //TODO: Handling for when user submits new note
        console.log('onSubmit', editingSubject)

        const dto = {...editingSubject}
        dto['id'] = new ObjectID().toString()
        dto['parent'] = ''
        dto['createdByUserId'] = currentUser?._id
        dto['noteCreationTime'] = new Date().toJSON()
        dto['dailyNoteForDate'] = new Date().toJSON()

        console.log('dto', dto)

        store.dispatch(noteActions?.add(dto))

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
        setCategoryOptions(options)
    }


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
                
                {
                editorMode === 'edit'
                ? (
                    <div className='flex w-40'>
                        <div className='w-70 p-1'>
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
                                placeholder="Category"
                                className='w-100'
                                size='small'
                            />
                        </div>
                        <div className='w-30  p-1'>
                            <Button size='small'>
                                <SaveOutlined/>
                            </Button>
                        </div>
                    </div>
                )
                : (
                    <div className='w-40 p-1'>
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
                            placeholder="Category"
                            className='w-100'
                        />
                    </div>
                )
            }
            </div>
            <div className='p-1'>
                <TextArea 
                    rows={4} 
                    onChange={(e) => onFormChange(e?.target?.value, 'body')}
                    value={editingSubject?.body}
                />
            </div>
            {
                editorMode === 'add'
                ? (
                    <div className='w-100 p-1'>
                        <Button 
                            className='w-100'
                            onClick={onSubmit}
                        >
                            Create New Note
                        </Button>
                    </div>
                )
                : null
            }
        </div>
    )
}