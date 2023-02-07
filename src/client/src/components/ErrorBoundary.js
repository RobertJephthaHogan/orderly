import * as React from 'react'
import { Result, Button } from 'antd'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="error"
                    title="Sorry, something went wrong"
                    subTitle="Contact support if the problem persists"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                localStorage?.clear()
                                window.location?.reload()
                                return false
                            }}
                        >
                            Clear Data and Reload
                        </Button>
                    }
                />
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
