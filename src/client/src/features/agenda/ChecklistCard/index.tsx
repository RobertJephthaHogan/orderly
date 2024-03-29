import { EllipsisOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'
import { ObjectID } from 'bson'
import { useSelector } from 'react-redux'
import checklistActions from '../../../redux/actions/checklist'
import Checklist from '../../checklists/Checklist'



interface CardProps {
    agendaChecklists?: any
    parent?: any
    selectedDate?: any 

}

export default function ChecklistCard(props: CardProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [checklistOptions, setChecklistOptions] = useState<any>([])
    const [activeChecklist, setActiveChecklist] = useState<any>()


    const onChecklistChange = (value: any) => {
        console.log('checklist change', value)
        setActiveChecklist(value)
    }

    const createDailyChecklist = () => {
        console.log('Creating daily checklist')

        const dto = {
            id: new ObjectID().toString(),
            title: `Daily Checklist for ${props.selectedDate?.toJSON().split('T')[0]}`,
            category: 'Daily',
            parent: props.parent?.[0]?.id,
            items: [],
            createdByUserId: currentUser?._id,
            checklistCreationTime: props.selectedDate?.toJSON()
        }

        console.log('dto', dto)
        store.dispatch(checklistActions.add(dto))
        setActiveChecklist(dto)
    }

    useEffect(() => {
        const clOptions = props.agendaChecklists?.map((checklist: any) => {
            return (
                {
                    value: checklist?.id,
                    label: checklist?.title
                }
            )
        }) || []
        setChecklistOptions(clOptions)
        setActiveChecklist(props.agendaChecklists?.[0]?.id)
    }, [props.agendaChecklists?.length, props.agendaChecklists])


    return (
        <div>
            <div className='flex jc-sb p-2'>
                <div>
                    <h5>Checklists:</h5>
                </div>
                <div>
                    <Button onClick={() => createDailyChecklist()} size='small'>
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div className='divider'/>
            {
                props.agendaChecklists?.length
                ? (
                    <div>
                        <div className='pl-1 pr-1'>
                            <h5>Checklist Card ({props.agendaChecklists?.length})</h5>
                        </div>
                        <div className='flex'>
                            <div className='w-100'>
                                <Select
                                    className='w-100 pl-1 pr-1'
                                    options={checklistOptions}
                                    onChange={onChecklistChange}
                                    value={activeChecklist}
                                />
                            </div>
                            <div className='pl-1 pr-1 flex'>
                                <Button
                                    onClick={() => createDailyChecklist()}
                                >
                                    <PlusOutlined/>
                                </Button>
                                <Button
                                    onClick={() => store.dispatch(widgetActions.showChecklistWidget())}
                                >
                                    <MoreOutlined/>
                                </Button>
                            </div>
                        </div>
                        <div className='pl-1 pr-1'>
                            <Checklist
                                checklistData={activeChecklist}
                            />
                        </div>
                    </div>
                )
                : (
                    <div className='mb-3 mt-3'>
                        <Empty
                            description={
                                <span>
                                  You do not have any Checklists for this day, create one?
                                </span>
                              }
                        />
                    </div>
                )
            }
            
        </div>
    )
}