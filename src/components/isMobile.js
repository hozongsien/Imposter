import { useEffect, useState } from "react";

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const isMobile = () => {
  return isAndroid() || isiOS();
};

export default isMobile;
