import { cloneElement, FC, isValidElement, PropsWithChildren, ReactElement, useEffect, useRef } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { verifyTokenForgotPassword } from "../apis/users.api";
// import Loading from "~components/common/Loading";
// import NotFound from "~pages/NotFound";
// import { ResetPasswordProps } from "~pages/ResetPassword/ResetPassword";

// ResetPasswordGuard is a component that will be used to protect routes /reset-password
// that should only be accessed with valid token from email.
const ResetPasswordGuard: FC<PropsWithChildren> = ({ children }) => {
  // Get token from query params
  const [params, setParams] = useSearchParams();
  const token = useRef(params.get("token"));

  // Mutation for verify token forgot password
  const {
    mutate: verifyForgotPasswordMutate,
    isIdle: isVerifyForgotPasswordIdle,
    isPending: isVerifyForgotPasswordPending,
    isSuccess: isVerifyForgotPasswordSuccess,
    isError: isVerifyForgotPasswordError,
  } = useMutation({
    mutationFn: ({ token, signal }: { token: string | null; signal?: AbortSignal }) =>
      verifyTokenForgotPassword(token, signal),
  });

  useEffect(() => {
    const controller = new AbortController();

    token &&
      verifyForgotPasswordMutate(
        { token: token.current, signal: controller.signal },
        {
          onSuccess: () => {
            if (token) {
              params.delete("token");
              setParams(params);
              toast.info("Vui lòng không tải lại trang!");
            }
          },
        },
      );

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyForgotPasswordMutate, token]);

  if (isVerifyForgotPasswordError) return <NotFound />;
  if (isVerifyForgotPasswordIdle || isVerifyForgotPasswordPending) return <Loading />;

  return (
    isVerifyForgotPasswordSuccess &&
    ((isValidElement(children) &&
      cloneElement(children as ReactElement<ResetPasswordProps>, { token: token.current })) || <Outlet />)
  );
};

export default ResetPasswordGuard;
