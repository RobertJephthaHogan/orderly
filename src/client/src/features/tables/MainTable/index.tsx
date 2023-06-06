import { Table } from 'antd';
import React, { useEffect, useState } from 'react'



const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


interface MainTableProps {
    tableData?: any
}


export default function MainTable(props: MainTableProps) {

    const [tableColumns, setTableColumns] = useState<any>()
    const [tableData, setTableData] = useState<any>()

    useEffect(() => {
        console.log('props?.tableData', props?.tableData)

        const cols = props?.tableData?.schema?.required?.map((property: any) => {
            return {
                title: property,
                dataIndex: property,
                key: property,
            }
        }) || []
        setTableColumns(cols)

        const tData = props?.tableData?.queryResult?.map((entry: any, i: any) => {
            return {
                ...entry,
                key: i
            }
        }) || []
        setTableData(tData)
    }, [props?.tableData])

    return (
        <div>
            <Table dataSource={tableData} columns={tableColumns} />
        </div>
    )
}