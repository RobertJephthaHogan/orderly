import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../../helpers'
import './styles.css'



export default function TaskCategoryMenu() {

    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const [sortedTasks, setSortedTasks] = useState<any>({})

    useEffect(() => {
        const st = groupByProperty(userTasks, 'category')
        const returnedTarget = Object.assign({All: userTasks}, st);
        setSortedTasks(returnedTarget)
    }, [userTasks])

    
    return (
        <div className='task-category-menu'>
            <div className='flex jc-c pt-1 pb-1'>
                Task Categories
            </div>
            <div className='divider'/>
            <div>
                <CategoryRows
                    sortedTasks={sortedTasks}
                />
            </div>
        </div>
    )
}


interface CategoryRowProps {
    sortedTasks?: any 
}

function CategoryRows(props: CategoryRowProps) {

    const rows = Object.entries(props.sortedTasks)?.map((category: any) => {
        return (
            <CategoryRow
                rowData={category}
                key={`category-row-${category[0]}`}
            />
        )
    })

    return (
        <div>
            {rows}
        </div>
    )

}



interface RowProps {
    rowData?: any
}

function CategoryRow(props: RowProps) {
    
    const [expanded, setExpanded] = useState<any>()

    const onExpandToggle = (e: any) => {
        setExpanded(!expanded)
    }

    return (
        <div>
            <div 
                className='pl-1 pt-1 category-row hcp'
                key={`${props.rowData[0]}-task-row`}
            >
                {
                    expanded ? (
                        <MinusSquareOutlined
                            onClick={onExpandToggle}
                        />
                    ) : (
                        <PlusSquareOutlined
                            onClick={onExpandToggle}
                        />
                    )
                }
                <span className='ml-1'>{props.rowData[0]}</span>
            </div>
            {
                expanded
                ? (
                    <div>
                        {
                            props.rowData[1]?.map((row:any, i: any) => {
                                return (
                                    <div 
                                        className='task-row pl-5 hcp'
                                        key={`${row}-${i}`}
                                    >
                                        <h5 className='p-0 m-0'>{row?.title}</h5>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    )
}