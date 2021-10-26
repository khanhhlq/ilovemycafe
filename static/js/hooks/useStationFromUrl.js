import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentStationIdState } from "../recoilState";
import getStationFromUrl from "../utils/getStationFromUrl";

export default function useStationFromUrl() {
  const setCurrentStationId = useSetRecoilState(currentStationIdState);

  useEffect(() => {
    const stationFromUrl = getStationFromUrl();
    if (stationFromUrl) {
      setCurrentStationId(stationFromUrl.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
