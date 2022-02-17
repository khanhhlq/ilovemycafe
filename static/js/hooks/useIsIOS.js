const { useEffect, useState } = require("react");

const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(iOS());
  }, []);

  return isIOS;
};

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 15 and 14 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export default useIsIOS;
