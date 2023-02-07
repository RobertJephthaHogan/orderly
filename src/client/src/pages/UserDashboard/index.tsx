import './styles.css'

type Props = {}

export const UserDashboard : React.FC<Props> = ({

}) => {
    return (
        <div className="user-dashboard">
            <div className="dashboard-overview">
                <div className="overview-card">
                    overview card
                </div>
            </div>
            <div className="dashboard-body">
                <div className='row'>
                    <div className='dash-card' >
                        Tasks Card
                    </div>
                    <div className='dash-card'>
                        Events Card
                    </div>
                    <div className='dash-card'>
                        Projects Card
                    </div>
                </div>
                <div className='row'>
                    <div className='dash-card'>
                        Tables Card
                    </div>
                    <div className='dash-card'>
                        Finances Card
                    </div>
                </div>
            </div>
        </div>
    )
}