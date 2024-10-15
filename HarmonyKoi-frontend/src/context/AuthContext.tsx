import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey } from '../apis/users.api';
import Loading from '../components/common/Loading';
import { SYSTEM_MESSAGES } from '../utils/constants';
import { getToken } from '../utils/cookies';

import { initialize, reducer } from "./auth.reducer";
import { AuthContextType, AuthState } from "./auth.type";

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
        toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        dispatch(initialize({ isAuthenticated: false, user: null }));
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
