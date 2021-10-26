// import { useRecoilValue } from "recoil";
// import { currentStationState } from "../recoilState";
// import createTwitterLink from "../utils/createTwitterLink";
// import plausible from "../utils/plausible";

// export default function useTweetStation() {
//   const currentStation = useRecoilValue(currentStationState);
//   function tweetStation() {
//     if (currentStation) {
//       plausible.track("Tweet Station", {
//         stationName: currentStation.name,
//         stationId: currentStation.id,
//       });
//       window.open(
//         createTwitterLink({
//           text: `Chilling with 🎧 ${currentStation.name}`,
//           url: ``,
//         })
//       );
//     }
//   }
//   return tweetStation;
// }
