// Packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Username from "components/user/Username";
import SearchBar from "components/search/SearchBar";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";
import SelectInput from "components/inputs/SelectInput";
import PlayerCard from "components/player/PlayerCard";
import NoResultFound from "components/misc/NoResultFound";
import Div from "components/html/Div";

// utils
import R from "utils/getResponsiveValue";
import { handleMultiSelectionDropDowns } from "utils/buildYourTeamHelper";
import { clone, isEmpty } from "utils/helpers";

// Animations
import ShowAllFiltersAnimation from "Animations/buildYourTeam/ShowAllFiltersAnimation";
import {
  playerPanelAnimation,
  playersPanelHeightAnimation,
} from "Animations/PlayersCardAnimations";

// Constants
import {
  ACTIVE_STATUS,
  ALL_STATUSES,
  ALL_TEAMS,
  PLAYERS_POSITIONS,
  PRICES,
  RECOMMENDATIONS,
  RECOMMENDED_PLAYERS,
  SORTING_OPTIONS,
  STATUSES,
} from "constants/data/filters";
import BuildYourTeamPlayersPagination from "./BuildYourTeamPlayersPagination";

// Styles
const getStyles = (R) => {
  return {
    allFiltersBox: {
      paddingBottom: R(20),
      paddingTop: R(15),
    },
    noResultFound: {
      top: R(600),
    },
    playerPanel: {
      paddingBottom: R(200),
    },
  };
};

export default function BuildTeamRightSection({
  teamInfo,
  clubs: clubsProp,
  handlePlayerSelection,
}) {
  const STYLES = { ...getStyles(R) };

  const { players } = teamInfo;

  // Global States
  const user = useSelector(({ auth }) => auth.user);

  // Initial States
  const clubsInitial = clone(clubsProp);
  const pricesInitial = clone(PRICES);
  const activeStatusInitial = clone(ACTIVE_STATUS);
  const recommendationsInitial = clone(RECOMMENDATIONS);
  const sortingOptionsInitial = clone(SORTING_OPTIONS);
  const statusesInitial = clone(STATUSES);
  const positionsInitial = clone(PLAYERS_POSITIONS);

  // Position States
  const [activePosition, setActivePosition] = useState({});
  // Club States
  const [clubs, setClubs] = useState([]);
  const [selectedClubs, setSelectedClubs] = useState([]);
  // Statuses
  const [statuses, setStatuses] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  // Price States
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  // Active Status States
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState({});
  // Recommendation States
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState();
  // Sorting States
  const [sortingOptions, setSortingOptions] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  // Filters State
  const [showAllFilters, setShowAllFilters] = useState(false);

  const initialSettings = () => {
    setActivePosition({ ...positionsInitial[0] });

    setClubs([...clubsInitial]);
    setSelectedClubs([clubsInitial[0]]);

    setStatuses([...statusesInitial]);
    setSelectedStatuses([statusesInitial[0]]);

    setPrices([...pricesInitial]);
    setSelectedPrice(pricesInitial[0]);

    setActiveStatuses([...activeStatusInitial]);
    setSelectedActiveStatus(activeStatusInitial[0]);

    setRecommendations([...recommendationsInitial]);
    setSelectedRecommendation(recommendationsInitial[0]);

    setSortingOptions([...sortingOptionsInitial]);
    setSelectedSortingOption(sortingOptionsInitial[0]);
  };

  const areFiltersApplied = () => {
    return (
      selectedClubs.length === 0 ||
      selectedClubs[0].value !== ALL_TEAMS ||
      // selectedStatuses.length === 0 ||
      // selectedStatuses[0].value !== ALL_STATUSES ||
      !isEmpty(selectedPrice.value)
      // ||
      // selectedRecommendation.value !== RECOMMENDED_PLAYERS
    );
  };

  const getPlayersContainerHeight = () => {
    if (areFiltersApplied() && !players.length) {
      return "hide";
    } else if (showAllFilters) {
      return "half";
    } else {
      return "full";
    }
  };

  const showPlayersSection = () => {
    return !isEmpty(players) && !isEmpty(selectedSortingOption);
  };

  const showPaginationSection = () => {
    return (
      !isEmpty(selectedSortingOption) &&
      !isEmpty(activePosition) &&
      !isEmpty(selectedPrice) &&
          !isEmpty(selectedActiveStatus)
    );
  };

  const noResultTextVisible = () => {
    return areFiltersApplied() && !players.length;
  };

  useEffect(() => {
    initialSettings();
  }, []);

  return (
    <Div position={"relative"} w={488} pt={35} pb={100}>
      {/*username*/}
      <Div className={"flex flex-row-reverse"} mb={46}>
        <Username username={`${user.firstName} ${user.lastName}`} />
      </Div>

      {/*search*/}
      <Div className={"flex"} mb={20}>
        <div className={"w-full"}>
          <SearchBar onSearch={() => false} />
        </div>
        <Div ml={8} />
        <FilterIcon
          showAllFilters={showAllFilters}
          onClick={() => setShowAllFilters(!showAllFilters)}
        />
      </Div>

      {/*filter buttons*/}
      <Div mb={24}>
        <FilterButtons
          activePosition={activePosition}
          onClick={(activePosition) => setActivePosition(activePosition)}
        />
      </Div>
      {/*all filters*/}
      {showAllFilters ? (
        <AnimatePresence>
          <motion.div
            variants={ShowAllFiltersAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={"absolute w-full"}
            style={STYLES.allFiltersBox}
          >
            <BuildYourTeamFilters
              // Teams Filter
              clubs={clubs}
              selectedClubs={selectedClubs}
              onClubSelected={(option) =>
                handleMultiSelectionDropDowns(option, {
                  firstOption: ALL_TEAMS,
                  initialState: clubsInitial,
                  state: clubs,
                  setSelectedOptions: setSelectedClubs,
                  setOptions: setClubs,
                })
              }
              // Statuses Filter
              statuses={statuses}
              selectedStatuses={selectedStatuses}
              onStatusSelected={(option) =>
                handleMultiSelectionDropDowns(option, {
                  firstOption: ALL_STATUSES,
                  initialState: statusesInitial,
                  state: statuses,
                  setSelectedOptions: setSelectedStatuses,
                  setOptions: setStatuses,
                })
              }
              // Prices Filter
              prices={prices}
              selectedPrice={selectedPrice}
              onPriceSelected={(price) => setSelectedPrice(price)}
                // activeStatus Filter
              activeStatuses={activeStatuses}
              selectedActiveStatus={selectedActiveStatus}
              onActiveStatusSelected={(as) => setSelectedActiveStatus(as)}
              // Recommendation Filter
              recommendations={recommendations}
              selectedRecommendation={selectedRecommendation}
              onRecommendationSelected={(r) => setSelectedRecommendation(r)}
              // Reset Filters
              onResetFilterClicked={initialSettings}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence />
      )}

      {noResultTextVisible() && (
        <div className={"absolute w-full"} style={STYLES.noResultFound}>
          <NoResultFound />
        </div>
      )}

      <motion.div
        variants={playerPanelAnimation()}
        animate={showAllFilters ? "slideDown" : "slideUp"}
      >
        <motion.div
          variants={playersPanelHeightAnimation()}
          animate={getPlayersContainerHeight()}
          style={STYLES.playerPanel}
        >
          <Div mb={16}>
            {noResultTextVisible() ? null : (
              <Div>
                <SelectInput
                  options={sortingOptions}
                  selectedOption={selectedSortingOption}
                  onOptionChange={(s) => setSelectedSortingOption(s)}
                  parentContainerStyle={{
                    zIndex: 1,
                  }}
                  hideLabel
                  dropDownOfInlineStyle
                />
              </Div>
            )}
          </Div>

          <Div h={"100%"} overFlowScroll>
            {showPlayersSection() &&
              players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelectPlayer={handlePlayerSelection}
                />
              ))}
          </Div>
          {showPaginationSection() && (
            <Div mt={noResultTextVisible() ? 320 : 40}>
              <BuildYourTeamPlayersPagination
                selectedSortingOption={selectedSortingOption}
                activePosition={activePosition}
                selectedClubs={selectedClubs}
                selectedPrice={selectedPrice}
                selectedActiveStatus={selectedActiveStatus}
                players={players}
              />
            </Div>
          )}
        </motion.div>
      </motion.div>
    </Div>
  );
}
