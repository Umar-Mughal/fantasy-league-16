// Packages
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Actions
import { getPlayers } from "redux/Players/api";
import {
  changeCurrentPageNumber,
  getPlayersLoadingOff,
  getPlayersNextPage,
  getPlayersPreviousPage,
  getPlayersStart,
} from "redux/Players/actionsCreators";

// Utils
import { getSelectedClubsIds, isEmpty } from "utils/helpers";

export default function BuildYourTeamPlayersPagination({
  selectedSortingOption,
  activePosition,
  selectedClubs,
  selectedPrice,
  selectedActiveStatus,
  players,
}) {
  const dispatch = useDispatch();
  const playersPerPage = useSelector(({ players }) => players.playersPerPage);
  const currentPage = useSelector(({ players }) => players.currentPage);
  const totalPages = useSelector(({ players }) => players.totalPages);
  const loadingPlayersGetting = useSelector(
    ({ players }) => players.loadingPlayersGetting
  );
  const disablePrev = currentPage < 1 || loadingPlayersGetting;
  const disableNext = currentPage === totalPages - 1 || loadingPlayersGetting;

  const onPreviousPage = async () => {
    dispatch(getPlayersStart());
    dispatch(getPlayersPreviousPage());
  };

  const onNextPage = async () => {
    dispatch(getPlayersStart());
    dispatch(getPlayersNextPage());
  };

  const onFirstPage = async () => {
    dispatch(getPlayersStart());
    dispatch(changeCurrentPageNumber(0));
  };

  const onLastPage = async () => {
    dispatch(getPlayersStart());
    dispatch(changeCurrentPageNumber(totalPages - 1));
  };

  const changePage = async (offset) => {
    const getPlayersInput = {
      first: playersPerPage,
      offset,
      where: {
        position: { eq: activePosition.value },
        teamId: getSelectedClubsIds(selectedClubs),
        value: { ...selectedPrice.value },
        active: selectedActiveStatus.value,
      },
      sortBy: { ...selectedSortingOption.value },
    };
    await dispatch(getPlayers(getPlayersInput));
  };

  const getOpacity = (v) => (v ? 0.2 : 1);

  useEffect(() => {
    if (currentPage === -1 || currentPage === totalPages) {
      return dispatch(getPlayersLoadingOff());
    }
    changePage(playersPerPage * currentPage);
  }, [currentPage]);

  useEffect(() => {
    onFirstPage();
    changePage(0);
  }, [
    selectedSortingOption,
    activePosition,
    selectedClubs,
    selectedPrice,
    selectedActiveStatus,
  ]);

  if (isEmpty(players)) return null;

  return (
    <Div center mb={20}>
      <Div center>
        <Image
          w={20}
          h={20}
          src={"/images/double-arrow-left.png"}
          disabled={disablePrev}
          opacity={getOpacity(disablePrev)}
          cursor={"pointer"}
          onClick={onFirstPage}
          alt={"double-arrow-left"}
        />
        <Image
          w={50}
          h={50}
          src={"/images/angle-circle-left.png"}
          disabled={disablePrev}
          opacity={getOpacity(disablePrev)}
          cursor={"pointer"}
          onClick={onPreviousPage}
          alt={"angle-circle-left"}
          ml={18}
        />
      </Div>
      <Text
        ml={20}
        mr={20}
        text={`${currentPage + 1} of ${totalPages}`}
        fs={20}
        nowrap
      />
      <Div center>
        <Image
          w={50}
          h={50}
          src={"/images/angle-circle-right.png"}
          disabled={disableNext}
          opacity={getOpacity(disableNext)}
          cursor={"pointer"}
          onClick={onNextPage}
          alt={"angle-circle-right"}
          mr={18}
        />
        <Image
          w={20}
          h={20}
          src={"/images/double-arrow-right.png"}
          disabled={disableNext}
          opacity={getOpacity(disableNext)}
          cursor={"pointer"}
          onClick={onLastPage}
          alt={"double-arrow-right"}
        />
      </Div>
    </Div>
  );
}
