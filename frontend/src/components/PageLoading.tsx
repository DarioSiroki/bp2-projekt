import { Spin } from 'antd';

const PageLoading = () => {
    return (
        <div className="loading-container">
            <Spin size="large" className="absolute-center" />
        </div>
    )
}

export default PageLoading;