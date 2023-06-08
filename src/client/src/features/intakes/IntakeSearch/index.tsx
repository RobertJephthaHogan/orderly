import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { filterByValue } from '../../../helpers'
import './styles.css'



interface IntakeSearchProps {
    onOk?: any
}

export default function IntakeSearch(props: IntakeSearchProps) {

    const currentUser = useSelector((state: any) => state?.user?.data ?? [])
    const userIntakes = useSelector((state: any) => state.intakes?.queryResult ?? [])
    const [searchText, setSearchText] = useState<any>('')
    const [allIntakeOptions, setAllIntakeOptions] = useState<any>()
    const [selectedIntake, setSelectedIntake] = useState<any>(null)


    const onChange = (value: any) => {
        console.log(value)
        setSearchText(value)
    }

    const onSelect = (value: any) => {
        console.log('value', value)
        setSelectedIntake(value)
    }

    const onOk = () => {
        if (props.onOk) {
            props.onOk(selectedIntake)
        }
    }

    useEffect(() => {

        //TODO: Generate User Intake Select Rows, filtered by searchText when it updates

        const filteredIntakes = filterByValue(userIntakes, searchText)

        const filteredIntakeOptions = filteredIntakes?.map((intake: any) => {

            return (
                <div 
                    className={`intake-option-row ${
                        selectedIntake?.id === intake?.id ? 'selected': ''
                    }`}
                    onClick={() => onSelect(intake)}
                    key={`${intake?.id}`}
                    
                >
                    {intake?.title}
                </div>
            )
        }) || []

        setAllIntakeOptions(filteredIntakeOptions)

    }, [searchText, selectedIntake])

    return (
        <div>
            Intake Search
            <div>
                <Input
                    placeholder='Search Text'
                    value={searchText}
                    onChange={(e) => onChange(e?.target?.value)}
                />
            </div>
            {/* <div>
                Template Intakes Select Area
            </div> */}
            <div className='pt-1'>
                <div 
                    className='bordered'
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}
                >
                    {allIntakeOptions}
                </div>
            </div>
            <div className='flex jc-e pt-1'>
                <Button
                    disabled={selectedIntake === null}
                    onClick={onOk}
                >
                    OK
                </Button>
            </div>
        </div>
    )
}