// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import PlayerImage from "components/player/PlayerImage";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

// Utils
import { nFormatter, truncate } from "utils/helpers";
import { positionAbbr } from "utils/playersHelper";

export default function TransferOut({ player }) {
  return (
    <>
      <Div className={"flex items-center"} mb={24}>
        <PlayerImage w={70} h={70} ciw={26} cih={26} player={player} />
        <Image
          src={"/images/info_grey.png"}
          alt={"info_grey"}
          h={20}
          w={20}
          ml={35}
        />
      </Div>
      <Div className={"flex flex-col"}>
        <Text
          fs={18}
          lh={22}
          fw={600}
          text={truncate(player.matchName, 13)}
          color={colors.black_rock}
          mb={6}
        />
        {/*<Text*/}
        {/*    text={*/}
        {/*        <>*/}
        {/*            <Text inline text={player.nextMatch.club}/>*/}
        {/*            <Text inline text={` vs ${player.nextMatch.vs}`} color={colors.regent_grey}/>*/}
        {/*        </>*/}
        {/*    }*/}
        {/*    fs={18}*/}
        {/*    lh={22}*/}
        {/*    fw={400}*/}
        {/*    colo={colors.black_rock}*/}
        {/*    mb={6}*/}
        {/*/>*/}
        <Text
          fs={18}
          lh={22}
          fw={600}
          text={nFormatter(player.value)}
          color={colors.black_rock}
          mb={6}
        />
        <Text
          fs={18}
          lh={22}
          fw={400}
          text={positionAbbr(player.position)}
          color={colors.regent_grey}
          mb={6}
        />
      </Div>
    </>
  );
}
