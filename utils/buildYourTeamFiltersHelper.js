// Constants
import {
  ALL_PRICES,
  ALL_STATUSES,
  ALL_TEAMS,
  MOST_PICKED_AS_CAPTAIN,
  MOST_PICKED_PLAYERS,
  POSITION_ALL,
  POTENTIAL_PENALTY_TAKERS,
  RECOMMENDED_PLAYERS,
} from "constants/data/filters";

const filtersHandler = ({
  player,
  selectedStatuses,
  selectedRecommendation,
}) => {
  // STATUS-FILTER
  if (
    selectedStatuses.length > 0 &&
    (selectedStatuses[0].value === ALL_STATUSES ||
      selectedStatuses.some((status) => status.value === player.state))
  ) {
    // Recommendation-FILTER
    if (
      (selectedRecommendation.value === RECOMMENDED_PLAYERS &&
        player.recommended) ||
      (selectedRecommendation.value === POTENTIAL_PENALTY_TAKERS &&
        player.penaltyTaker) ||
      (selectedRecommendation.value === MOST_PICKED_PLAYERS &&
        player.picked > 0) ||
      (selectedRecommendation.value === MOST_PICKED_AS_CAPTAIN &&
        player.pickedAsCaptain > 0)
    ) {
      return true;
    }
  }
};

export default filtersHandler;
