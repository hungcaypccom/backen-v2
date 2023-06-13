import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate()
    return (
      <div className='error-page'>
        <Result
          icon={<SmileOutlined />}
          title="Something went wrong!"
          extra={<Button onClick={() => navigate("/")} type="primary">Back to Home</Button>}
        />
      </div>
    )
};

export default Error;