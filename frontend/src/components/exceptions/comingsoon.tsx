import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Result
          icon={<SmileOutlined />}
          title="Our AI is under development!"
          extra={<Button onClick={() => navigate("/")} type="primary">Back to Home</Button>}
        />
    )
};

export default ComingSoon;