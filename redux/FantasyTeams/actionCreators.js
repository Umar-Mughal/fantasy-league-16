
export const CREATE_FANTASY_TEAM_SUCCESS = "CREATE_FANTASY_TEAM_SUCCESS";
export const CREATE_FANTASY_TEAM_ERROR = "CREATE_FANTASY_TEAM_ERROR";

export const RESET_PAGE = "RESET_PAGE";


export const createFantasyTeamSuccess = (payload) => {
    return {
        type: CREATE_FANTASY_TEAM_SUCCESS,
        payload
    }
}

export const createFantasyTeamFailed = (payload) => {
    return {
        type: CREATE_FANTASY_TEAM_ERROR,
        payload
    }
}