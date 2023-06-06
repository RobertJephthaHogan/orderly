import { Table } from 'antd';
import React, { useEffect } from 'react'



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

    useEffect(() => {
        console.log('props?.tableData', props?.tableData)
    }, [props?.tableData])

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}