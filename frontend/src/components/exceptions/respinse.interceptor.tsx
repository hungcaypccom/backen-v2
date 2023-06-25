import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userInstance } from "../../services/api";

interface Props {
  children?: React.ReactElement;
}

export const ResponseInterceptor: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const interceptorId = useRef<number | null>(null);

  useEffect(() => {
    interceptorId.current = userInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            navigate("/login");
            break;
          case 404: 
        }
      }
    );
    return () => {
      userInstance.interceptors.response.eject(interceptorId.current as number);
    };
  }, []);

  return <>{children ? children : null}</>;
};
