import { Select } from 'antd'
import React from 'react'


interface TableTopBarProps {
    selectedTable?: any
    onTableChange?: any
}

export default function TableTopBar(props: TableTopBarProps) {


    const selectOptions = [
        {
          value: 'Tasks',
          label: 'Tasks',
        },
        {
          value: 'Events',
          label: 'Events',
        },
        {
          value: 'Projects',
          label: 'Projects',
        },
        {
            value: 'Intakes',
            label: 'Intakes',
        },
    ]

    return (
        <div>
            <div className='m-1'>
                <Select
                    defaultValue={'Tasks'}
                    value={props?.selectedTable && props?.selectedTable}
                    options={selectOptions}
                    onChange={(v) => props.onTableChange && props.onTableChange(v)}
                />
            </div>
            <div>

            </div>
        </div>
    )
}