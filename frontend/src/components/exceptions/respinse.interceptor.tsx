import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInstance } from '../../services/api';

export const ResponseInterceptor = ({children}:{children:React.ReactElement}) => {
  const navigate = useNavigate()

  const interceptorId = useRef<number | null>(null);

  useEffect(() => {
    interceptorId.current = userInstance.interceptors.response.use(undefined, (error) => {
      switch (error.response.status) {
        case 401:
          navigate('/login');
          break;
      }
    });

    return () => {
        userInstance.interceptors.response.eject(interceptorId.current as number);
    };
  }, []);

  return <>
  {children}
  </>;
};