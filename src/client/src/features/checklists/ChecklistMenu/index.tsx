import React, { useEffect, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../../helpers'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'



export default function ChecklistMenu () {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const [menuView, setMenuView] = useState<any>('daily')
    const [sortedChecklists, setSortedChecklists] = useState<any>({})
    const [dailyChecklists, setDailyChecklists] = useState<any>([])


    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    useEffect(() => { // sort Checklists when Checklists update
		const sc = groupByProperty(userChecklists, 'category')
		const sorted = Object.assign({All: userChecklists}, {...sc});
		setSortedChecklists(sorted)
	}, [userChecklists])

    useEffect(() => {
        const filtered = userChecklists.filter((n: any) => n.category == "Daily" )
        setDailyChecklists(filtered)
    }, [userChecklists])


    return (
        <div className='checklist-menu-component'>
            <div className='flex jc-sb p-2'>
                <div>
                    <h4>Checklists</h4>
                </div>
                <div className='flex'>
                    <div className='bordered mr-1'  onClick={() => setMenuView('daily')}>
                        <h5 className='ml-1 mr-1'>Daily</h5>
                    </div>
                    <div  className='bordered mr-1'  onClick={() => setMenuView('categories')}>
                        <h5 className='ml-1 mr-1'>Categories</h5>
                    </div>
                    <div  className='bordered'  onClick={() => setMenuView('all')}>
                        <h5 className='ml-1 mr-1'>All</h5>
                    </div>
                </div>
            </div>
            <div className='divider'/>
            <div>
                c
            </div>
        </div>
    )
}