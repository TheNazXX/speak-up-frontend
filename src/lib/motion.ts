import { delay } from "framer-motion";

class MOTION_ANIMATIONS {
  appearance(delay = 1) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay },
    };
  }
}

export const animations = new MOTION_ANIMATIONS();
