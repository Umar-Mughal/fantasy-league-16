// Packages

// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import Header from "components/playerInfo/Header"

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import PointsBoard from "components/playerInfo/PointsBoard";

// Styles
const getStyles = (R) => {
    return {
        pointsBox: {
            overflowY: 'scroll',
            overflowX: 'hidden',
            marginTop: R(65),
            flexGrow: 1
        }
    }
}

export default function PlayerInfoModal({
   player,
   show,
   onClose,
                                            onMakeCaptain,
}) {
    const STYLES = {...getStyles(R)}
    return (
        <Modal>
            <div
                className={`${!show && 'hidden'} fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                {
                    show && (
                        <Div w={482} br={12} bg={colors.white} className={'h-[74%] flex flex-col'}>
                            <Div>
                                <Header
                                    player={player}
                                    onClose={onClose}
                                    onMakeCaptain={() => onMakeCaptain(player)}
                                />
                            </Div>
                            <Div style={STYLES.pointsBox}><PointsBoard player={player}/></Div>
                        </Div>
                    )
                }

            </div>
        </Modal>
    )
}