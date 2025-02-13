import { useEffect, useState } from "react";
import { useNavigationType, useSearchParams } from "react-router-dom";

interface ConfirmationMessageProps {
  message: string;
  expectedQueryParamVal: string;
  expectedNavType: "REPLACE" | "POP";
}

function ConfirmationMessage({
  message,
  expectedQueryParamVal,
  expectedNavType,
}: ConfirmationMessageProps): React.JSX.Element | null {
  const [searchParams] = useSearchParams();
  const navigationType = useNavigationType();

  const queryParam = searchParams.get("status");

  const hasExpectedNavType = navigationType === expectedNavType;
  const hasExpectedStatus = queryParam === expectedQueryParamVal;

  const [isVisible, setIsVisible] = useState(
    hasExpectedNavType && hasExpectedStatus
  );

  //Remove confirmation message after few seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  return <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>;
}

export default ConfirmationMessage;
