import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-[1260px] max-w-[calc(100%-48px)] ml-auto mr-auto">{children}</div>;
};

export default Container;
