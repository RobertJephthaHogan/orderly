import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Empty, Input } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'




export default function IntakeForm() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [ingredients, setIngredients] = useState<any>([])
    const [editingIndex, setEditingIndex] = useState<any>(null)
    const [formValues, setFormValues] = useState<any>(
            {
                ingredients: []
            }
        )

    const onChange = (value: any, field: any) => {
        console.log(value)
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log(workingObj)
        setFormValues(workingObj)
    }

    const addNewIngredient = () => {
        const workingIngredients = [...ingredients, {}]
        setIngredients(workingIngredients)
        setEditingIndex(workingIngredients?.length)
    }


    function IngredientInput() {

        const [editingSubject, setEditingSubject] = useState<any>({})

        const onChange = (value: any, field: string) => {
            const workingObj = {...editingSubject}
            workingObj[field] = value
            console.log('workingObj', workingObj)
            setEditingSubject(workingObj)
        }

        return (
            <div>
                <div className='flex'>
                    <Input
                        placeholder='Title'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'title')}
                    />
                    <Input
                        placeholder='Serving Size'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'servingSize')}
                    />
                    <Input
                        placeholder='Calories'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'calories')}
                    />
                    <Input
                        placeholder='Protein'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'protein')}
                    />
                    <Input
                        placeholder='Carbs'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'carbs')}
                    />
                    <Input
                        placeholder='Fat'
                        className='m-1'
                        onChange={(e) => onChange(e?.target?.value, 'fat')}
                    />
                </div>
                <div className='pt-1 pl-4 pr-4'>
                    <Button className='w-100' size='small'>
                        Add Ingredient to Intake
                    </Button>
                </div>
            </div>
        )
    }


    return (
        <div>
            Intake Form
            <div className='p-1'>
                <h3 className='brdr-b'>Intake Form</h3>
            </div>
            <div className='p-1'>
                <Input 
                    placeholder='Title'
                    onChange={(e) => onChange(e?.target?.value, 'title')}
                />
            </div>
            <div className='p-1'>
                <DatePicker 
                    placeholder='Date'
                    className='w-100'
                    onChange={(value) => onChange(value, 'date')}
                />
            </div>
            <div className='p-1'>
                <div>
                Ingredients
                {!ingredients?.length && <Empty/>}
                {
                    editingIndex !== null
                    ? (
                        <IngredientInput/>
                    )
                    : null
                }
                </div>
                <div className='p-1'>
                    {
                        editingIndex === null
                        ? (
                            <Button 
                            className='w-100'
                            onClick={() => addNewIngredient()}
                        >
                            <PlusOutlined/>
                        </Button>
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    )
}