import { useEffect, useState } from "react";
import { openingStatus, type OpeningStatus } from "./hours";

// Null until mounted, so the server render and the first client render match.
export function useOpeningStatus() {
  const [status, setStatus] = useState<OpeningStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(openingStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
