import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Empty, Input } from 'antd'
import { ObjectID } from 'bson'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.css'



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

    const submitNewIntake = () => {
        console.log('submitting new intake')
        const dto = {...formValues}
        dto['id'] = new ObjectID().toString()
        dto['createdByUserId'] = currentUser?._id
        dto['hasBeenConsumed'] = false

        console.log('dto', dto)
    }

    useMemo(() => {
        console.log('formValues', formValues)
    }, [formValues])


    function IngredientInput() {

        const [editingSubject, setEditingSubject] = useState<any>({})

        const onIngredientChange = (value: any, field: string) => {
            const workingObj = {...editingSubject}
            workingObj[field] = value
            console.log('workingObj', workingObj)
            setEditingSubject(workingObj)
        }

        const handleAddIngredient = () => {
            const existing = {...formValues}
            existing.ingredients = [...existing?.ingredients, editingSubject]
            setFormValues(existing)
            setIngredients([])
            setEditingIndex(null)
        }

        return (
            <div>
                <div className='flex'>
                    <Input
                        placeholder='Title'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'title')}
                    />
                    <Input
                        placeholder='Serving Size'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'servingSize')}
                    />
                    <Input
                        placeholder='Calories'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'calories')}
                    />
                    <Input
                        placeholder='Protein'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'protein')}
                    />
                    <Input
                        placeholder='Carbs'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'carbs')}
                    />
                    <Input
                        placeholder='Fat'
                        className='m-1'
                        onChange={(e) => onIngredientChange(e?.target?.value, 'fat')}
                    />
                </div>
                <div className='pt-1 pl-4 pr-4'>
                    <Button className='w-100' size='small' onClick={handleAddIngredient}>
                        Add Ingredient to Intake
                    </Button>
                </div>
            </div>
        )
    }



    interface IngredientRowProps {
        ingredientRowData?: any
    }

    function IngredientRows(props: IngredientRowProps) {

        const [rows, setRows] = useState<any>()

        useMemo(() => {

            const iRows = props?.ingredientRowData?.map((r: any) => {
                console.log('r', r)

                return (
                    <div className='flex w-100'>
                        <div className='w-100 flex jc-c'>
                            <h5>{r?.title}</h5>
                        </div>
                        <div className='w-100 flex jc-c'>
                            {r?.servingSize}
                        </div>
                        <div className='w-100 flex jc-c'>
                            {r?.calories}
                        </div>
                        <div className='w-100 flex jc-c'>
                            {r?.protein}
                        </div>
                        <div className='w-100 flex jc-c'>
                            {r?.carbs}
                        </div>
                        <div className='w-100 flex jc-c'>
                            {r?.fat}
                        </div>
                    </div>
                )
            })
            setRows(iRows)
        }, [props?.ingredientRowData?.length])


        return (
            <div className='w-100'>
                <div className='flex w-100'>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>title</h4>
                    </div>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>servingSize</h4>
                    </div>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>calories</h4>
                    </div>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>protein</h4>
                    </div>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>carbs</h4>
                    </div>
                    <div className='w-100 flex jc-c'>
                        <h4 className='brdr-b'>fat</h4>
                    </div>
                </div>
                {rows}
            </div>
        )

    }


    return (
        <div>
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
                    popupClassName='datepicker-pop-up'
                    placeholder='Date'
                    className='w-100'
                    onChange={(value: any) => onChange(new Date(value).toJSON(), 'date')}
                />
            </div>
            <div className='p-1'>
                <div className='p-2'>
                    <h2>Ingredients:</h2>
                    <div className='divider'/>
                    {
                        formValues?.ingredients?.length
                        ? (
                            <IngredientRows
                                ingredientRowData={formValues?.ingredients}
                            />
                        )
                        : null
                    }
                    {
                        !ingredients?.length 
                        && !formValues?.ingredients?.length
                        && <Empty/>
                    }
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
                <div className='divider mt-3'/>
                <div className='p-2'>
                    <Button
                        className='w-100'
                        onClick={() => submitNewIntake()}
                    >
                        Submit New Intake
                    </Button>
                </div>
            </div>
        </div>
    )
}