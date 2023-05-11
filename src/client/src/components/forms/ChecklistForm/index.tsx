import { Input, Select } from 'antd'
import React, { useState } from 'react'




export default function ChecklistForm() {

    const [formValues, setFormValues] = useState<any>()

    return (
        <div>
            Checklist Form
            <Input 
                placeholder='Title'
            />
            <Select 
                placeholder='Category'
            />
        </div>
    )
}