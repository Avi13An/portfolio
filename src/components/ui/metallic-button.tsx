"use client";

import React from "react";
import LiquidMetalButton, { LiquidMetalButtonProps } from "./liquid-metal-button";

export type MetallicButtonProps = LiquidMetalButtonProps;

export function MetallicButton(props: MetallicButtonProps) {
  return <LiquidMetalButton {...props} />;
}

export { LiquidMetalButton };
export default MetallicButton;
