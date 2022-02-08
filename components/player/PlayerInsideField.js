// Packages
import {AnimatePresence, motion} from "framer-motion";

// Components
import PlayerImage from "components/player/PlayerImage";
import PlayerName from "components/player/PlayerName";

// Utils
import R from "utils/getResponsiveValue";
import {getButtonBGColor, MATCHES, TOTAL_POINTS} from "utils/mySquadHelper";
import {nFormatter} from "utils/helpers";

// Constants
import {STATUS_INJURED, STATUS_SUSPENDED} from "constants/data/filters";

// Animations
import {TextUnderPlayerNameAnimation} from "Animations/mySquad/SelectedPlayerOnPitchAnimation";

// Styles
const getStyles = (R, player) => {
    return {
        nameSection: {
            paddingLeft: R(player ? 18 : 8),
            paddingRight: R(player ? 18 : 8),
            paddingTop: R(player ? 3 : 6),
            paddingBottom: R(player ? 3 : 6),
            borderRadius: R(40),
            marginTop: R(3),
            fontSize: R(10),
            width: R(90)
        },
        clickedIcon: {
            width: R(16),
            height: R(16)
        },
        subTitle: {
            position: 'absolute',
            left: 0,
            right: 0
        },
        statusImage: {
            width: R(15),
            height: R(15),
            position: 'absolute',
            top: 0,
            right: 0,
            borderRadius: R(20),
            background: 'white'
        },

    }
}

const SubTitle = ({player}) => {

    const STYLES = {...getStyles(R, player)}

    if (player.activeFilter === TOTAL_POINTS) {
        return (
            <AnimatePresence>
                <motion.span
                    variants={TextUnderPlayerNameAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={1}
                    style={STYLES.subTitle}
                >
                    {`${player.points} pts`}
                </motion.span>
            </AnimatePresence>
        )
    } else if (player.activeFilter === MATCHES) {
        return (
            <AnimatePresence>
                <motion.span
                    variants={TextUnderPlayerNameAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={2}
                    style={STYLES.subTitle}
                >
                    {`${player.nextMatch.vs} (${player.nextMatch.matchType})`}
                </motion.span>
            </AnimatePresence>
        )
    }
    return (
        <AnimatePresence>
            <motion.span
                variants={TextUnderPlayerNameAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                key={3}
                style={STYLES.subTitle}
            >
                {nFormatter(player.price)}
            </motion.span>
        </AnimatePresence>
    )

}

const PlayerInsideField = ({player, onPlayerChange, onPlayerClick}) => {

    const STYLES = {...getStyles(R, player)}

    return (
        <div className={'flex flex-col items-center'}>
            <PlayerImage
                player={player}
                ciw={18}
                cih={18}
                cursor={'pointer'}
                clickedIcon={player.clickedIcon}
                onIconClick={() => onPlayerChange(player)}
                onPlayerClick={() => onPlayerClick(player)}
                clickedIconStyle={STYLES.clickedIcon}
            />
            <div
                className={`items-center relative items-center text-center justify-center cursor-pointer text-white whitespace-nowrap ${getButtonBGColor(player)}`}
                style={STYLES.nameSection}
                onClick={() => onPlayerClick(player)}
            >
                {
                    player.status === STATUS_INJURED || player.status === STATUS_SUSPENDED && (
                        <div className={'flex items-center justify-center'} style={STYLES.statusImage}>
                            <img src={`/images/${player.statusImage}`} alt="" width={10} height={10}/>
                        </div>
                    )
                }

                <PlayerName player={player}/>
                <div className={'relative'}>
                    <SubTitle player={player}/>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default PlayerInsideField