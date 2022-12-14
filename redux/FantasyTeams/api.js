// GraphQL
import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_TEAM from "graphql/mutations/createFantasyTeam";
import DO_FANTASY_TEAM_TRANSFER from "graphql/mutations/doFantasyTeamTransfers";
import GET_FANTASY_TEAM from "graphql/queries/fantasyTeamById";
import SWAP_FANTASY_TEAM_PLAYERS from "graphql/mutations/swapFantasyTeamPlayers";
import SET_FANTASY_TEAM_BOOSTER from "graphql/mutations/setFantasyTeamBooster";

// Constants
import { BOOST_TYPE_BENCH, ERROR_MSG } from "constants/universalConstants";

// Utils
import { isEmpty, responseFailed, responseSuccess } from "utils/helpers";
import { buildPlayers } from "utils/playersHelper";

// Actions
import {
  fantasyTeamBoosterFailed,
  fantasyTeamBoosterSuccess,
  fantasyTeamCreationStart,
  fantasyTeamSwapFailed,
  fantasyTeamSwapSuccess,
  fantasyTeamTransferStart,
} from "./actionCreators";

import { me } from "redux/Auth/api";

export const createFantasyTeam = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fantasyTeamCreationStart());
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: CREATE_FANTASY_TEAM,
        variables: {
          goalkeepers: data.goalkeepers,
          defenders: data.defenders,
          midfielders: data.midfielders,
          forwards: data.forwards,
          name: data.name,
        },
      });

      if (result && !isEmpty(result.data.createFantasyTeam)) {
        return responseSuccess(
          "Fantasy Team Created Successfully!",
          result.data.createFantasyTeam
        );
      }
      return responseFailed(ERROR_MSG);
    } catch (e) {
      return responseFailed(ERROR_MSG);
    }
  };
};

export const getFantasyTeamById = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: GET_FANTASY_TEAM,
        variables: {
          gameweek: data.gameWeek,
          fantasyTeamId: data.fantasyTeamId,
        },
      });

      if (result && !isEmpty(result.data.fantasyTeamById)) {
        return responseSuccess("Success !!!", result.data.fantasyTeamById);
      }
      return responseFailed(ERROR_MSG);
    } catch (e) {
      return responseFailed(ERROR_MSG);
    }
  };
};

export const doFantasyTeamTransfers = (data) => {
  const { fantasyTeamId, transfers } = data;

  return async (dispatch) => {
    try {
      dispatch(fantasyTeamTransferStart());
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: DO_FANTASY_TEAM_TRANSFER,
        variables: {
          fantasyTeamId,
          transfers,
        },
      });

      if (result && !isEmpty(result.data.transferPlayers)) {
        return responseSuccess(
          "Transfer Successful Redirecting!!!",
          result.data.transferPlayers
        );
      }
      return responseFailed(ERROR_MSG);
    } catch (e) {
      return responseFailed(ERROR_MSG);
    }
  };
};

export const swapFantasyTeamPlayers = ({
  fantasyTeamId,
  captain,
  viceCaptain,
  substitutes,
}) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: SWAP_FANTASY_TEAM_PLAYERS,
        variables: {
          fantasyTeamId,
          captain,
          viceCaptain,
          substitutes,
        },
      });
      if (result && !isEmpty(result.data.swapFantasyTeamPlayers)) {
        dispatch(fantasyTeamSwapSuccess());
        return responseSuccess(
          "Players have been successfully swapped !!!",
          result.data.swapFantasyTeamPlayers
        );
      }
      dispatch(fantasyTeamSwapFailed());
      return responseFailed(ERROR_MSG);
    } catch (e) {
      dispatch(fantasyTeamSwapFailed());
      return responseFailed(ERROR_MSG);
    }
  };
};

export const setFantasyTeamBooster = (data) => {
  const { fantasyTeamId, gameweek, type } = data;
  const isTypeBenchBoost = type === BOOST_TYPE_BENCH;

  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: SET_FANTASY_TEAM_BOOSTER,
        variables: {
          fantasyTeamId,
          gameweek,
          type,
        },
      });

      // Success
      if (result && !isEmpty(result.data.setFantasyTeamBooster)) {
        dispatch(fantasyTeamBoosterSuccess());
        dispatch(me());
        return responseSuccess(
          `${
            isTypeBenchBoost ? "Bench" : "Triple Captain"
          } Boost Applied Successfully!!!`
        );
      }

      // Failed
      dispatch(fantasyTeamBoosterFailed());
      return responseFailed(ERROR_MSG);
    } catch (e) {
      // Failed
      dispatch(fantasyTeamBoosterFailed());
      return responseFailed(ERROR_MSG);
    }
  };
};
