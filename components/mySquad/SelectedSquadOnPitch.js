// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Div from "components/html/Div";
import Animated from "components/animation/Animated";
import PlayersFormation from "components/mySquad/formation/PlayersFormation";

// Utils
import R from "utils/getResponsiveValue";
import {isEmpty} from "utils/helpers";

// Constants
import {
    EIGHT,
    ELEVEN,
    FIVE,
    FOUR,
    FOURTEEN,
    NINE,
    ONE,
    SEVEN,
    SIX,
    TEN,
    THIRTEEN,
    THREE,
    TWELVE,
    TWO,
    ZERO
} from "constants/arrayIndexes";
import {ANIMATE, INITIAL} from "constants/animations";

// Styles
const getStyles = (R) => {
    return {
        commonPlayersStyle: {
            minWidth: R(120)
        },
        commonPlayersStyle1: {
            paddingLeft: R(10),
            paddingRight: R(10),
            minWidth: R(100)
        },
    }
}

export default function SelectedSquadOnPitch ({
    squadInfo,
    onPlayerChange,
    onPlayerClick,
    changeFormation,
    tripleCaptainApplied,
    benchBoostApplied,
}){

    const STYLES =  { ... getStyles(R) }
    const { squad, formationInfo } = squadInfo
    const { toggleFormation } = formationInfo

    const buildPlayer = (index) => {
        return {
            ...squad[index],
            onPlayerChange: (player) => onPlayerChange(player, index),
            onPlayerClick: (player) => onPlayerClick(player, index),
            tripleCaptainApplied,
            benchBoostApplied,
        }
    }

    const getPreviousFormation = () => {
        return formationInfo.formation === '343'
    }

// All-Players
    const p1 = () => {
        return {
            player: {...buildPlayer(ZERO)},
            style: {...STYLES.commonPlayersStyle}
        }
    }

    const p2 = () => {
        return {
            player: {...buildPlayer(ONE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p3 = () => {
        return {
            player: {...buildPlayer(TWO)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p4 = () => {
        return {
            player: {...buildPlayer(THREE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p5 = () => {
        return {
            player: {...buildPlayer(FOUR)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p6 = () => {
        return {
            player: {...buildPlayer(FIVE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p7 = () => {
        return {
            player: {...buildPlayer(SIX)},
            style: { ...STYLES.commonPlayersStyle }
        }
    }

    const p8 = () => {
        return {
            player: {...buildPlayer(SEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p9 = () => {
        return {
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p10 = () => {
        return {
            player: {...buildPlayer(NINE)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p11 = () => {
        return {
            player: {...buildPlayer(TEN)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p12 = () => {
        return {
            player: {...buildPlayer(ELEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p13 = () => {
        return {
            player: {...buildPlayer(TWELVE)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p14 = () => {
        return {
            player: {...buildPlayer(THIRTEEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p15 = () => {
        return {
            player: {...buildPlayer(FOURTEEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    // Player-JSX
    const renderPlayer = (props) => {
        const {
            animation,
            player,
            style,
        } = props

        let animationVariants = isEmpty(animation) ? null : animation.variants
        let animationControls = isEmpty(animation) ? null : animation.controls

        return (
            <motion.div
                variants={animationVariants}
                animate={animationControls}
            >
                <SelectedPlayerOnPitch
                    player={player}
                    changed={player.toggleAnimation}
                    style={{
                        ...style,
                        opacity: player.opacity,
                    }}
                />
            </motion.div>
        )
    }


    return(
        <Animated toggleAnimation={!benchBoostApplied}>
            <Animated toggleAnimation={toggleFormation} animationSpeed={1}>
                <PlayersFormation
                    formationInfo={{
                        ...formationInfo,
                        changeFormation
                    }}
                    renderPlayer={renderPlayer}
                    players={{p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15}}
                />
            </Animated>
        </Animated>
    )
}