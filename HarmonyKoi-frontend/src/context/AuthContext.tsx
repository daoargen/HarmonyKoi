import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey, refreshToken } from '../apis/users.api';
import Loading from '../components/common/Loading';
import { SYSTEM_MESSAGES } from '../utils/constants';
import { getToken, removeToken, setToken } from '../utils/cookies';

import { initialize, reducer } from "./auth.reducer";
import { AuthContextType, AuthState } from "./auth.type";
import { Axios, AxiosError } from "axios";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { refetch: userRefetch } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: false,
  });

  useEffect(() => {
    (async () => {
      const accessToken = getToken();
      if (!accessToken) {
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const { data } = await userRefetch(); 
        if (data) {
          const user = data.data.data.user;
          dispatch(initialize({ isAuthenticated: true, user }));
        }
      } catch (error) {
        // toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        // dispatch(initialize({ isAuthenticated: false, user: null }));
        if ((error as AxiosError).response?.status === 401) {
          try {
            const response = await refreshToken();
            const { access_token } = response.data.data;
            setToken(access_token); // Update token
            const { data: newUser } = await userRefetch(); // Fetch user with new token
            dispatch(initialize({ isAuthenticated: true, user: newUser?.data?.data?.user }));
          } catch (refreshError) {
            removeToken();
            dispatch(initialize({ isAuthenticated: false, user: null }));
          }
        } else {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
          dispatch(initialize({ isAuthenticated: false, user: null }));
        }
      }
    })();
  }, [userRefetch]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.isInitialized ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
