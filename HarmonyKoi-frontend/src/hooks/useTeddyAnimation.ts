import { ChangeEvent, FocusEvent, useCallback, useMemo } from "react";

import { Alignment, Fit, Layout, useRive, useStateMachineInput } from "@rive-app/react-canvas";

export type ObserveInput = {
  onBlur?: () => void;
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const STATE_MACHINE_NAME = "Teddy State Machine";
const DEFAULT_VALUE_LOOK_REGISTER_PAGE = 28;

const useTeddyAnimation = () => {
  const { rive, RiveComponent } = useRive({
    src: "/rive/teddy_authentication.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const isChecking = useStateMachineInput(rive, STATE_MACHINE_NAME, "isChecking");
  const numberLook = useStateMachineInput(rive, STATE_MACHINE_NAME, "numberLook");
  const triggerSuccess = useStateMachineInput(rive, STATE_MACHINE_NAME, "triggerSuccess");
  const triggerFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "triggerFail");
  const isHandsUp = useStateMachineInput(rive, STATE_MACHINE_NAME, "isHandsUp");

  const teddyLook = useCallback(
    (nbChars: number) => {
      isChecking && (isChecking.value = true);
      isHandsUp && (isHandsUp.value = false);

      // Formula to calculate teddy's eye ratio when observing input box
      // This formula is relatively based on layout
      const ratio = nbChars / 40;
      const nbLook = ratio * 100 - 25;

      numberLook && (numberLook.value = nbLook);
    },
    [isChecking, isHandsUp, numberLook],
  );

  const observeInputText: ObserveInput = useMemo(
    () => ({
      onFocus: (e) => {
        isChecking && (isChecking.value = true);
        teddyLook(e.target.value.length);
      },
      onBlur: () => {
        isChecking && (isChecking.value = false);
      },
      onChange: (e) => {
        teddyLook(e.target.value.length);
      },
    }),
    [isChecking, teddyLook],
  );
  const observeInputPassword: ObserveInput = useMemo(
    () => ({
      onFocus: () => {
        isHandsUp && (isHandsUp.value = true);
      },
      onBlur: () => {
        isHandsUp && (isHandsUp.value = false);
      },
    }),
    [isHandsUp],
  );
  const observeInputEmail: ObserveInput = useMemo(
    () => ({
      onFocus: () => {
        isChecking && (isChecking.value = true);
        teddyLook(DEFAULT_VALUE_LOOK_REGISTER_PAGE);
      },
      onBlur: () => {
        isChecking && (isChecking.value = false);
      },
      onChange: (e) => {
        teddyLook(e.target.value.length + DEFAULT_VALUE_LOOK_REGISTER_PAGE);
      },
    }),
    [isChecking, teddyLook],
  );

  const teddySuccess = useCallback(() => {
    isHandsUp && (isHandsUp.value = false);
    triggerSuccess && triggerSuccess.fire();
  }, [isHandsUp, triggerSuccess]);

  const teddyFail = useCallback(() => {
    isHandsUp && (isHandsUp.value = false);
    triggerFail && triggerFail.fire();
  }, [isHandsUp, triggerFail]);

  return {
    RiveComponent,
    observeInputText,
    observeInputPassword,
    observeInputEmail,
    teddySuccess,
    teddyFail,
  };
};

export default useTeddyAnimation;
