import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './styles.css'


type Props = {
    sortedEvents?: any
    setEvent?: any
    setCategory?: any
    selectedEvent?: any
    selectedCategory?: any
}

export const EventMenu : React.FC<Props> = ({
    sortedEvents,
    setEvent,
    setCategory,
    selectedEvent,
    selectedCategory
}) => {


    type EventRowProps = {
        eventData?:any
    }

    const EventRowRender : React.FC<EventRowProps> = ({
        eventData
    }) => {

        const onEventClick = (e: any) => {
            setEvent(eventData)
        }

        return (
            <div 
                className='evt-row'
                onClick={onEventClick}
                key={`${eventData?.id}`}
            >
                {eventData?.title} 
            </div>
        )
    }


    type EventRowsProps = {
        categoryEvents?: any
    }

    const EventRowsRender : React.FC<EventRowsProps> = ({
        categoryEvents
    }) => {

        const rows = categoryEvents?.map((evt: any) => {
            return (
                <div key={`evt-row-${evt.id}`}>
                    <EventRowRender
                        eventData={evt}
                    />
                </div>
            )
        })

        return (
            <div>
                {rows}
            </div>
        )
    }


    type CategoryRowProps = {
        categoryRowData?: any
    }

    const CategoryRowRenderer : React.FC<CategoryRowProps> = ({
        categoryRowData
    }) => {

        const [isExpanded, setIsExpanded] = useState<any>(false)

        const onRowClick = (data: any) => {
            let formatted = {
                title: data[0],
                children: data[1]
            }
            setCategory(formatted)
        }

        const onExpandToggle = (e: any) => {
            setIsExpanded(!isExpanded)
        }

        return (
            <div key={`evt-category-row-${categoryRowData[0]}`}>
                <div 
                    className='w-100 pl-2 pr-2 pt-1 evt-category-menu-item brdr-b'
                    
                >
                    <div 
                        className='w-100 flex'
                        onClick={() => onRowClick(categoryRowData)}
                    >
                        {
                            isExpanded ? (
                                <MinusSquareOutlined
                                    onClick={onExpandToggle}
                                />
                            ) : (
                                <PlusSquareOutlined
                                    onClick={onExpandToggle}
                                />
                            )
                        }
                        <div className='pl-1' >
                            <h5>{categoryRowData[0]}</h5>
                        </div>
                    </div>
                </div>
                {
                    isExpanded ? (
                        <div className='w-100'>
                            <EventRowsRender
                                categoryEvents={categoryRowData[1]}
                            />
                        </div>
                    ) : null
                }
            </div>
        )
    }


    const EventCategoryRows = () => {
        const rows = Object.entries(sortedEvents)?.map((evtCategory: any) => {
            return (
                <div 
                    className='w-100' 
                    key={`${evtCategory[0]}`}
                >
                    <CategoryRowRenderer
                        categoryRowData={evtCategory}
                    />
                </div>
            )
        })
        return (
            <div>
                {rows}
            </div>
        )
    }


    return (
        <div 
            className='event-menu'
            style={{
                backgroundColor: '#ffffff'
            }}
        >
            <div className='w-100 flex p-1'>
                <h5>Event Categories</h5>
            </div>
            <div className='divider'/>
            <div>
                {
                    Object.entries(sortedEvents)?.length && (
                        <EventCategoryRows/>
                    )
                }
            </div>
        </div>
        
    )
}