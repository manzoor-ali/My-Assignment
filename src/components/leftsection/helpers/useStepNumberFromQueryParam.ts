import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useStepNumberFromQueryParam(
  onUpdate: (stepNumber: number) => void,
): void {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const stepNumber = searchParams.get("stepnumber");
    if (stepNumber) {
      const parsedStepNumber = parseInt(stepNumber, 10);
      if (!isNaN(parsedStepNumber)) {
        onUpdate(parsedStepNumber);
      }
    }
  }, [location, onUpdate]);
}
