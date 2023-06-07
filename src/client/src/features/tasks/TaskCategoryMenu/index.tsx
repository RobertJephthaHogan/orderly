import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../../helpers'
import './styles.css'



interface Props {
    setTaskCategory?: any
}

export default function TaskCategoryMenu(props: Props) {

    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const [sortedTasks, setSortedTasks] = useState<any>({})

    useEffect(() => {
        const st = groupByProperty(userTasks, 'category')
        const returnedTarget = Object.assign({All: userTasks}, st);
        setSortedTasks(returnedTarget)
    }, [userTasks])

    
    return (
        <div className='task-category-menu'>
            <div className='flex p-1'>
                <h5>Task Categories</h5>
            </div>
            <div className='divider'/>
            <div>
                <CategoryRows
                    sortedTasks={sortedTasks}
                    setTaskCategory={props.setTaskCategory}
                />
            </div>
        </div>
    )
}


interface CategoryRowProps {
    sortedTasks?: any 
    setTaskCategory?: any
}

function CategoryRows(props: CategoryRowProps) {


    const rows = Object.entries(props.sortedTasks)?.map((category: any) => {
        return (
            <CategoryRow
                rowData={category}
                key={`category-row-${category[0]}`}
                setTaskCategory={props.setTaskCategory}
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
    setTaskCategory?: any
}

function CategoryRow(props: RowProps) {
    
    const [expanded, setExpanded] = useState<any>()
    
    // On click row here?
    
    const onRowClick = (data: any) => {
        console.log('data', data)
        let formatted = {
            title: data[0],
            children: data[1]
        }
        props.setTaskCategory(formatted)
    }

    const onExpandToggle = (e: any) => {
        setExpanded(!expanded)
    }

    return (
        <div onClick={() => onRowClick(props.rowData)}>
            <div 
                className='pl-1 pt-1 category-row hcp flex'
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
                <div className='ml-1'>
                    <h5>{props.rowData[0]}</h5>
                </div>
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