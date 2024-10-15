import { ComponentProps, ReactNode, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BiLoaderAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getGoogleAuthUrl, getGoogleUrlQueryKey, getMe, getMeQueryKey, loginWithGoogle } from './../../../apis/users.api';
import icons from '../../../assets/icons';
import { Button } from '../../ui/button';
import configs from '../../../configs';
import { signIn } from '../../../context/auth.reducer';
import useAuth from '../../../hooks/useAuth';
import { SYSTEM_MESSAGES } from '../../../utils/constants';

import Loading from "../Loading";

import ButtonLink from "./components/ButtonLink";

interface AuthFormProps {
  children: ReactNode;
  animation: (props: ComponentProps<"canvas">) => JSX.Element;
  title: string;
  loading?: boolean;
}

// Constants for transition button group login/register
const SLIDE_LEFT = { x: 0 };
const SLIDE_RIGHT = { x: 112 };

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

const AuthForm = ({ children, animation: Animation, title, loading }: AuthFormProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch } = useAuth();

  const animateCondition = useMemo(
    () => pathname === configs.routes.register || pathname === configs.routes.login,
    [pathname],
  );

  // Get code from query params
  const [params] = useSearchParams();
  const code = useMemo(() => params.get("code"), [params]);

  // Get google auth url
  const { data: googleUrl } = useQuery({
    queryKey: [getGoogleUrlQueryKey],
    queryFn: () => getGoogleAuthUrl(),
    staleTime: STALE_TIME_GOOGLE_AUTH_URL,
    refetchOnWindowFocus: false,
  });
  const url = useMemo(() => (googleUrl && googleUrl.data.data.url) || "", [googleUrl]);

  // Mutation for login with google
  const { mutate: googleMutate } = useMutation({
    mutationFn: ({ code, signal }: { code: string; signal?: AbortSignal }) => loginWithGoogle(code, signal),
  });

  // Query for get user info
  const { refetch: userRefetch } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    code &&
      googleMutate(
        { code, signal: controller.signal },
        {
          onSuccess: async () => {
            const { data } = await userRefetch();
            if (data) {
              const user = data.data.data.user;
              dispatch(signIn({ isAuthenticated: true, user }));
            }
          },
          onError: () => {
            toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG, {
              onClose: () => {
                navigate(-1);
              },
            });
          },
        },
      );

    return () => {
      controller.abort();
    };
  }, [code, dispatch, googleMutate, navigate, userRefetch]);

  return code ? (
    <Loading />
  ) : (
    <main className="relative w-screen h-screen bg-auth">
      {animateCondition && (
        <div className="fixed top-9 right-24 z-10 inline-block h-[50px] bg-white rounded-full transition-colors hover:bg-accent hover:text-accent-foreground">
          <motion.div
            className="absolute top-0 min-w-28 h-full bg-primary rounded-full shadow"
            initial={pathname === configs.routes.register ? SLIDE_LEFT : SLIDE_RIGHT}
            animate={pathname === configs.routes.register ? SLIDE_RIGHT : SLIDE_LEFT}
          />

          <ButtonLink to={configs.routes.login}>Đăng nhập</ButtonLink>
          <ButtonLink to={configs.routes.register}>Đăng ký</ButtonLink>
        </div>
      )}

      <section className="absolute top-[calc(50%+20px)] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pt-32 px-16 pb-10 bg-neutral-200 rounded-[20px] [box-shadow:0px_7.249px_22.411px_0px_rgba(0,_0,_0,_0.21),_0px_3.016px_9.326px_0px_rgba(0,_0,_0,_0.29)]">
        <motion.div
          className="absolute -top-[172px]"
          initial={{
            left: "50%",
            x: "-50%",
            y: "100%",
            zIndex: -1,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: 0,
            zIndex: 0,
            scale: 1,
            opacity: 1,
          }}
        >
          <Animation className="w-[300px] h-[300px]" />
        </motion.div>
        <h1 className="mb-2 text-zinc-800 text-center text-3xl font-extrabold leading-[1.2]">{title}</h1>
        <div>{children}</div>
        <div className="flex justify-center w-full">
          <Button variant={"outline"} size={"lg"} className="w-96 mt-7 p-0" disabled={loading}>
            <Link to={loading ? "" : url} className="w-full py-2">
              <div className="flex justify-center items-center gap-3">
                {loading ? <BiLoaderAlt className="me-2 animate-spin" /> : <FcGoogle size={20} />}
                <span className="text-zinc-500 text-base">Tiếp tục với Google</span>
              </div>
            </Link>
          </Button>
        </div>
      </section>

      <motion.div>
        <motion.img
          src={icons.authDecorate}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none"
          initial={{
            transform: pathname === configs.routes.login ? "translateX(-60%)" : "translateX(0)",
          }}
          animate={{
            transform: pathname === configs.routes.login ? "translateX(0)" : "translateX(-60%)",
          }}
        />
        <motion.img
          src={icons.authDecorateFlip}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none translate-x-full"
          initial={{
            transform: pathname === configs.routes.login ? "translateX(37%)" : "translateX(97%)",
          }}
          animate={{
            transform: pathname === configs.routes.login ? "translateX(97%)" : "translateX(37%)",
          }}
        />
      </motion.div>
    </main>
  );
};

export default AuthForm;
