// Packages
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify"

// Components
import Layout from "components/layout";
import FooterBar from "components/footer/FooterBar";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildTeamRightSection from "components/buildTeam/BuildTeamRightSection";
import TransferWindowModal from "components/transferWindow/TransferWindowModal";
import {isEmpty} from "lodash"

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";
import {
    handleAutoPick,
    playerSelectionHandler,
    playerDeselectionHandler,
    sortingHandler, initialSettingsForTransferWindows, playerTransferDeselectHandler,
    playerTransferSelectionHandler, initialSettingsForBuildYourTeam
} from "utils/buildYourTeamHelper";
import filtersHandler from "utils/buildYourTeamFiltersHelper";

// Constants
import {
    // POSITIONS
    POSITION_ALL,
    // CLUBS
    CLUBS,
    // PRICES
    PRICES,
    // STATUES
    STATUSES,
    // RECOMMENDATIONS
    RECOMMENDATIONS,
    // SORTING
    SORTING_OPTIONS,
} from "constants/data/filters";

import {
    SELECTED_PLAYERS
} from "constants/data/players";

// Actions
import {
    saveFantasyTeamToRedux, fantasyTeamTransferFailed,
    fantasyTeamTransferStart,
    fantasyTeamTransferSuccess
} from "redux/FantasyTeams/actionCreators";
import {getFantasyTeamById} from "redux/FantasyTeams/api";
import {doFantasyTeamTransfers} from "redux/FantasyTeams/api";

export default function BuildTeamPlayers ({
    players: $players,
    clubs: $clubs,
}) {

    const dispatch = useDispatch()
    const router= useRouter()

    // Initial States
    const CLUBS_INITIAL = clone($clubs)
    const PRICES_INITIAL = clone(PRICES)
    const STATUSES_INITIAL = clone(STATUSES)
    const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS)
    const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS)
    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    // Picked-Players
    const [pickedPlayers, setPickedPlayers] = useState(SELECTED_PLAYERS_INITIAL)

    // Footer Bar States
    const [totalChosenPlayers, setTotalChosenPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [showAllFilters, setShowAllFilters] = useState(false)
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)

    // Players States
    const [playersData, setPlayersData] = useState([])
    const [playersDataInitial, setPlayersDataInitial] = useState([]) // contains all players

    // Positions States
    const [activePosition, setActivePosition] = useState(POSITION_ALL)

    // Clubs States
    const [clubs, setClubs] = useState([...CLUBS_INITIAL])
    const [selectedClubs, setSelectedClubs] = useState([CLUBS_INITIAL[0]])

    // Statuses Statuses
    const [statuses, setStatuses] = useState([...STATUSES_INITIAL])
    const [selectedStatuses, setSelectedStatuses] = useState([STATUSES_INITIAL[0]])

    // Prices States
    const [prices, setPrices] = useState([...PRICES_INITIAL])
    const [selectedPrice, setSelectedPrice] = useState(PRICES_INITIAL[0])

    // Recommendations States
    const [recommendations, setRecommendations] = useState([...RECOMMENDATIONS_INITIAL])
    const [selectedRecommendation, setSelectedRecommendation] = useState(RECOMMENDATIONS_INITIAL[0])

    // Sorting
    const [sortingOptions, setSortingOptions] = useState([...SORTING_OPTIONS_INITIAL])
    const [selectedSortingOption, setSelectedSortingOption] = useState(SORTING_OPTIONS_INITIAL[0])

    // States-for-Player-Transfer
    const [remainingBudget, setRemainingBudget] = useState('')
    const [noOfFreeTransfersLeft, setNoOfFreeTransfersLeft] = useState('')
    const [isOneFreeTransferWindow, setIsOneFreeTransferWindow] = useState(false)
    const [showFooterBar, setShowFooterBar] = useState(false)
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [currentTransferredToBePlayer, setCurrentTransferredToBePlayer] = useState({})
    const [additionalTransferredPlayers, setAdditionalTransferredPlayers] = useState(0)
    const [transferResetDisabled, setTransferResetDisabled] = useState(true)
    const [transferConfirmDisabled, setTransferConfirmDisabled] = useState(true)
    const [transferredPlayers, setTransferredPlayers] = useState([])
    const [showTransferWindowModal, setShowTransferWindowModal] = useState(false)

    // Global States
    const user = useSelector(({ auth }) => auth.user);
    const totalBudget = useSelector(({ fantasyTeam }) => fantasyTeam.totalBudget);

    // OnSearch
    const onSearch = () => false

    // Reset-Filters
    const handleResetFilter = () => {

        setClubs([...CLUBS_INITIAL])
        setSelectedClubs([CLUBS_INITIAL[0]])

        setStatuses([...STATUSES_INITIAL])
        setSelectedStatuses([STATUSES_INITIAL[0]])

        setPrices([...PRICES_INITIAL])
        setSelectedPrice(PRICES_INITIAL[0])

        setRecommendations([...RECOMMENDATIONS_INITIAL])
        setSelectedRecommendation(RECOMMENDATIONS_INITIAL[0])
    }

    // Filters-And-Sorting
    const runFiltersOnPlayersData = () => {

        let $playersData = [ ...playersDataInitial ]

        $playersData = $playersData.filter(player => {
            return filtersHandler({
                player,
                activePosition,
                selectedClubs,
                selectedPrice,
                selectedStatuses,
                selectedRecommendation
            })
        })

        $playersData = sortingHandler({
            playersData: $playersData,
            selectedSortingOption
        })

        setPlayersData([...$playersData])
    }

    useEffect(() => {
            runFiltersOnPlayersData()
    }, [clubs, statuses, selectedRecommendation, selectedPrice, activePosition, selectedSortingOption,playersDataInitial
    ])

    // Player-Selection
    const handlePlayerSelection = (player) => {
        return playerSelectionHandler({player,
            playersDataInitial,
            setPlayersDataInitial,
            totalChosenPlayers,
            setTotalChosenPlayers,
            pickedPlayers,
            setPickedPlayers,
            remainingBudget,
            setRemainingBudget
        })
    }

    // Player-Deselection
    const handlePlayerDeselection = (position, i) => {
        return playerDeselectionHandler({
            position,
            i,
            pickedPlayers,
            setPickedPlayers,
            remainingBudget,
            setRemainingBudget,
            totalChosenPlayers,
            setTotalChosenPlayers,
            playersDataInitial,
            setPlayersDataInitial,
            setContinueDisabled
        })
    }

    // Player-Transfer-Player-Deselection
    const executeTransferPlayerDeselect = () => {
        setTransferInProgress(true)
        return playerTransferDeselectHandler(
            {
                position: currentTransferredToBePlayer.position,
                i: currentTransferredToBePlayer.index,
                pickedPlayers,
                setPickedPlayers,
                remainingBudget,
                setRemainingBudget,
                playersDataInitial,
                setPlayersDataInitial,
                setContinueDisabled
            }
        )
    }

    useEffect(() => {
        if(isEmpty(currentTransferredToBePlayer) || currentTransferredToBePlayer.position === null || transferInProgress) return
        executeTransferPlayerDeselect()
    }, [currentTransferredToBePlayer])

    const handleTransferPlayerDeselect = (position, i) => {
        setCurrentTransferredToBePlayer({position: position, index: i})
    }

    // Player-Transfer-Player-Selection
    const handleTransferPlayerSelection = (player) => {
        playerTransferSelectionHandler({
            player,
            // Players-Data
            playersDataInitial,
            setPlayersDataInitial,
            // Picked-Players
            pickedPlayers,
            setPickedPlayers,
            // Remaining-Budget
            remainingBudget,
            setRemainingBudget,
            // Transfer
            setTransferInProgress,
            noOfFreeTransfersLeft,
            setNoOfFreeTransfersLeft,
            additionalTransferredPlayers,
            setAdditionalTransferredPlayers,
            transferredPlayers,
            setTransferredPlayers,
            // Buttons
            setTransferResetDisabled,
            setTransferConfirmDisabled,
        })
    }

    // Player-Transfer-Reset
    const onTransferResetClick = () => {
        initiateInitialSettings()
    }

    // Player-Transfer-Confirm
    const onTransferConfirmClick = () => {
        setShowTransferWindowModal(true)
    }

    const onTransferModalConfirmed = async () => {
        let transfers = []
        transferredPlayers.forEach(p => {
            transfers.push({
                in: { id: p.transferIn.id},
                out: { id: p.transferOut.id }
            })
        })

        const { success, msg } = await dispatch(doFantasyTeamTransfers({ fantasyTeamId: user.fantasyTeamId, transfers}))

        /****** Toast ******/
        if (success) {
          toast.success(msg, {
              onClose: () => {
                  dispatch(fantasyTeamTransferSuccess())
                  return router.push("/my_squad_game_week")
              }});
        } else {
            toast.error(msg, { onClose: () => dispatch(fantasyTeamTransferFailed())});
        }
    }

    useEffect(() => {
        if(totalChosenPlayers === 0) {
            setAutoPickDisabled(false)
            setResetDisabled(true)
            setContinueDisabled(true)
        }else if(totalChosenPlayers === 15 && remainingBudget > 0){
            setAutoPickDisabled(true)
            setResetDisabled(false)
            setContinueDisabled(false)
        }
    }, [totalChosenPlayers])

    const onAutoPick = () => {

        const {
            chosenPlayersWithinBudget,
            remainingBudget,
            totalChosenPlayers: totalChosenPlayersI,
            players: playersI
        } = handleAutoPick({
            players: $players,
            totalBudget
        })

        setPickedPlayers(chosenPlayersWithinBudget)
        setRemainingBudget(remainingBudget)
        setTotalChosenPlayers(totalChosenPlayersI)
        setPlayersDataInitial(playersI)

        setAutoPickDisabled(true)
        setResetDisabled(false)
    }

    const handleResetClick = () => {
        setPickedPlayers({...SELECTED_PLAYERS_INITIAL})
        setTotalChosenPlayers(0)
        setRemainingBudget(totalBudget)
        setAutoPickDisabled(false)
        setResetDisabled(true)
        setContinueDisabled(true)
        setPlayersDataInitial([...$players])
    }

    const saveToLocalStorageOnlyForTesting = () => {
        localStorage.setItem("teamData", JSON.stringify({
            pickedPlayers,
            remainingBudget,
            // Only for transfer windows
            noOfFreeTransfersLeft,
            additionalTransferredPlayers
        }))
        router.push('/my_squad_game_week')
    }

    const persistDataToReduxStore = () => {
        const teamData = JSON.stringify({
            pickedPlayers,
            remainingBudget,
            // Only for transfer windows
            noOfFreeTransfersLeft,
            additionalTransferredPlayers
        })

        dispatch(saveFantasyTeamToRedux(teamData))
        router.push('/create_team_name')
    }

    const handleContinueClick = () => {
        // saveToLocalStorageOnlyForTesting()
        persistDataToReduxStore()
    }

    // Initial Settings for Build Your Team & Transfer windows
    const initiateInitialSettings = async () => {

        // For Transfer Window
        const { success, data } = await dispatch(getFantasyTeamById({
                   gameWeek: user.currentGameweek ,
                   fantasyTeamId: user.fantasyTeamId,
           }))

        // Fetch team data from backend database
        if (success) {
            return initialSettingsForTransferWindows({
                // Team Data
                squad: data,
                // Picked Players
                setPickedPlayers,
                // Budget
                remainingBudget: totalBudget - user.fantasyTeamValue,
                setRemainingBudget,
                // Players-Data
                setPlayersData,
                playersDataInitial: $players,
                setPlayersDataInitial,
                // Transfer Window
                freeTransfers: user.freeTransfers,
                setIsOneFreeTransferWindow,
                setTransferInProgress,
                setCurrentTransferredToBePlayer,
                setNoOfFreeTransfersLeft,
                setAdditionalTransferredPlayers,
                setTransferResetDisabled,
                setTransferConfirmDisabled,
                setTransferredPlayers,
                // Footer
                setShowFooterBar,
            })
        }

        return initialSettingsForBuildYourTeam({
            players: $players,
            pickedPlayers,
            setPlayersDataInitial,
            setPlayersData,
            setShowFooterBar,
            setRemainingBudget,
            totalBudget
        })
    }

    // Did-Mount
    useEffect(() => {
        initiateInitialSettings()
    }, [$players])

    return (
        <Layout title="Build Team All Player" showToast={true}>
            <div className="mx-auto flex bg-white">
                    {/*Left-Section*/}
                    <div className="w-[57%]">
                        <BuildTeamLeftSection
                            isOneFreeTransferWindow={isOneFreeTransferWindow}
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onDeselectPlayer={ isOneFreeTransferWindow ? handleTransferPlayerDeselect : handlePlayerDeselection }
                        />
                    </div>
                    {/*Right-Section*/}
                    <div className="w-[43%] flex justify-center" style={{minHeight: R()}}>
                        <BuildTeamRightSection
                            // Filters
                            showAllFilters={showAllFilters}
                            setShowAllFilters={setShowAllFilters}
                            // Positions
                            activePosition={activePosition}
                            setActivePosition={setActivePosition}
                            // Clubs
                            selectedClubs={selectedClubs}
                            clubs={clubs}
                            setClubs={setClubs}
                            setSelectedClubs={setSelectedClubs}
                            clubsInitial={CLUBS_INITIAL}
                            // Statuses
                            selectedStatuses={selectedStatuses}
                            statuses={statuses}
                            setStatuses={setStatuses}
                            setSelectedStatuses={setSelectedStatuses}
                            statusesInitial={STATUSES_INITIAL}
                            // Prices
                            prices={prices}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            // Recommendations
                            recommendations={recommendations}
                            selectedRecommendation={selectedRecommendation}
                            setSelectedRecommendation={setSelectedRecommendation}
                            // Players-Data
                            playersData={playersData}
                            // Reset-Filter-Button
                            handleResetFilter={handleResetFilter}
                            // Sorting
                            sortingOptions={sortingOptions}
                            selectedSortingOption={selectedSortingOption}
                            setSelectedSortingOption={setSelectedSortingOption}
                            // Player-Selection
                            handlePlayerSelection={ isOneFreeTransferWindow ? handleTransferPlayerSelection : handlePlayerSelection}
                            // Search
                            onSearch={onSearch}
                        />
                    </div>
                    {
                        showFooterBar && (
                            <FooterBar
                                totalChosenPlayers={totalChosenPlayers}
                                remainingBudget={remainingBudget}
                                resetDisabled={resetDisabled}
                                autoPickDisabled={autoPickDisabled}
                                continueDisabled={continueDisabled}
                                onAutoPick={onAutoPick}
                                onContinueClick={handleContinueClick}
                                onResetClick={handleResetClick}
                                // Transfer-Window
                                isOneFreeTransferWindow={isOneFreeTransferWindow}
                                noOfFreeTransfersLeft={noOfFreeTransfersLeft}
                                transferResetDisabled={transferResetDisabled}
                                transferConfirmDisabled={transferConfirmDisabled}
                                onTransferResetClick={onTransferResetClick}
                                onTransferConfirmClick={onTransferConfirmClick}
                                additionalTransferredPlayers={additionalTransferredPlayers}
                            />
                        )
                    }

                    <TransferWindowModal
                        show={showTransferWindowModal}
                        transferredPlayers={transferredPlayers}
                        onCancel={() => setShowTransferWindowModal(false)}
                        onConfirmed={onTransferModalConfirmed}

                        // Additional Data
                        remainingBudget={remainingBudget}
                        additionalTransferredPlayers={additionalTransferredPlayers}
                    />
            </div>
        </Layout>
    )
}
