import {
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "./data/filters";

export const currencySymbol = "€";
export const CONTAINER_SIZE = 1440;
export const POINTS_PER_ADDITIONAL_TRANSFER = 4;
export const ERROR_MSG = "Something went wrong. Please try again !!!";
export const publicRoutes = ["/", "/sign_in", "/sign_up"];
export const authRoutes = ["/", "/sign_in", "/sign_up"];
export const homeRoute1 = "/build_team_all_players";
export const homeRoute2 = "/my_squad_game_week";
export const formations = {
  F442: "442",
  F433: "433",
  F352: "352",
  F451: "451",
  F343: "343",
  F532: "532",
  F541: "541",
};

export const BOOST_TYPE_BENCH = "BENCH";
export const BOOST_TYPE_TRIPLE_CAPTAIN = "TRIPLE_CAPTAIN";

// PLAYERS
export const MAX_PLAYERS_PER_CLUB = 3;
export const PLAYERS_COUNT_IN_TEAM = {
  [POSITION_GK]: 2,
  [POSITION_DEF]: 5,
  [POSITION_MID]: 5,
  [POSITION_FWD]: 3,
};
export const TOTAL_PLAYER_IN_TEAM = 15;

// Routes Names
export const routesNames = {
  MY_SQUAD_GAME_WEEK: "/my_squad_game_week",
  BUILD_TEAM_ALL_PLAYERS: "/build_team_all_players",
};
