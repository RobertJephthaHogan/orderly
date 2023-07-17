import React, { useMemo, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { userService } from '../../services'
import { openNotification } from '../../helpers/notifications'
import { store } from '../../redux/store'
import userActions from '../../redux/actions/user'



export default function UserSettings() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [activeField, setActiveField] = useState<any>('')


    const handleSaveField = (value: any, fieldName: any) => {
        setActiveField('')
        console.log('handleSaveField value', value)

        const dto = {...currentUser}

        console.log(currentUser)

        dto[fieldName] = value

        console.log('dto', dto)

        userService.updateUser(dto?._id, dto)
            .then((resp: any) => {
                console.log('resp', resp)
                if (resp) {
                    openNotification(
                        resp?.data?.response_type,
                        `User ${resp?.data?.data?._id} Updated Successfully`
                    )

                    store.dispatch(userActions.login(resp?.data))

                }
            })
            .catch((er: any) => {
                console.error('er', er)
            })

    }

    
    return (
        <div className='user-settings-component p-1'>
            <div className='user-settings-top-bar mb-1'>
                top bar
            </div>
            <div>
                <div className='user-info-card  mb-1'>
                    <div className='p-2'>
                        <h4>User information card</h4>
                    </div>
                    <div className='divider' />
                    <EditableSettingRow
                        rowLabel={'First Name :'}
                        rowValue={currentUser?.firstName}
                        fieldName={'firstName'}
                        activeField={activeField}
                        currentUser={currentUser}
                        setActiveField={setActiveField}
                        handleSaveField={handleSaveField}
                    />
                    <EditableSettingRow
                        rowLabel={'Last Name :'}
                        rowValue={currentUser?.lastName}
                        fieldName={'lastName'}
                        activeField={activeField}
                        currentUser={currentUser}
                        setActiveField={setActiveField}
                        handleSaveField={handleSaveField}
                    />
                    <EditableSettingRow
                        rowLabel={'Email :'}
                        rowValue={currentUser?.email}
                        fieldName={'email'}
                        activeField={activeField}
                        currentUser={currentUser}
                        setActiveField={setActiveField}
                        handleSaveField={handleSaveField}
                    />
                    {/* <div className=' info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'>First Name : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.firstName} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined onClick={() => setActiveField('firstName')} className='hcp'/> </h5>
                        </div>
                    </div> */}
                    {/* <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'>Last Name : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.lastName} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div> */}
                    {/* <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Email : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.email} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div> */}
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Password : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> xxxxxxxxxxx </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Phone Number : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.phoneNumber} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Height : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 5' 10'' </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Weight : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 170 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Body Fat Percentage : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 12 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Target Weight : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 215 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Target BFP : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 7 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined className='hcp' /> </h5>
                        </div>
                    </div>
                    
                </div>
                <div className='user-info-card  mb-1'>
                    <div className='p-2'>
                        <h4>User nutrition settings card</h4>
                    </div>
                    <div className='divider' />
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Water Intake Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 124 </h5>
                        </div>
                    </div>
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Calorie Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> Calorie Goals </h5>
                        </div>
                    </div>
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Macro Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> macro goals </h5>
                        </div>
                    </div>

                </div>
                {/* <div className='user-info-card  mb-1'>
                    morning routine card
                    
                </div>
                <div className='user-info-card  mb-1'>
                    evening routine card
                    
                </div> */}
            </div>
        </div>
    )
}




interface EditableSettingRowProps {
    rowLabel: any
    rowValue: any
    fieldName: any
    activeField: any
    currentUser: any
    setActiveField: any
    handleSaveField: any
}

function EditableSettingRow(props: EditableSettingRowProps) {

    const [editableFieldValue, setEditableFieldValue] = useState<any>()

    useMemo(() => {
        setEditableFieldValue(props?.rowValue)
    }, [props?.rowValue])


    const handleFieldChange = (value: string) => {
        console.log('handleFieldChange', value)
        setEditableFieldValue(value)
    }


    if (props.activeField === props.fieldName) {
        console.log('field Match')
        return (
            <div className=' info-row flex p-1 pl-3'>
                <div>
                    <h5 className='vm-auto'>{props.rowLabel}</h5>
                </div>
                <div className='pl-2'> 
                    <Input
                        defaultValue={editableFieldValue}
                        value={editableFieldValue}
                        onChange={(e) => handleFieldChange(e?.target?.value)}
                    />
                </div>
                <div className='pl-4'>
                    <Button 
                        size='small'
                        onClick={() => props.handleSaveField(editableFieldValue, props.fieldName)}
                    >
                        <SaveOutlined/>
                    </Button>
                </div>
            </div>
        )
    }

    if (props.activeField !== props.fieldName) {
        console.log('Not')
        return (
            <div className=' info-row flex p-1 pl-3'>
                <div>
                    <h5 className='vm-auto'>{props.rowLabel}</h5>
                </div>
                <div className='pl-2'> 
                    <h5 className='vm-auto'> {props.rowValue} </h5>
                </div>
                <div className='pl-4 edit-icon'>
                    <h5 className='vm-auto'><EditOutlined onClick={() => props.setActiveField(props.fieldName)} className='hcp'/> </h5>
                </div>
            </div>
        )
    }

    return (
        <div>

        </div>
    )
}