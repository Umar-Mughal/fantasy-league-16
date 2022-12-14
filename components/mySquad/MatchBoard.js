// Packages
import {motion, useAnimation} from "framer-motion";
import {createRef, useEffect, useRef, useState} from "react";
import dayjs from 'dayjs'
import {useDispatch, useSelector} from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import Button from "components/html/Button";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors";

// utils
import R from "utils/getResponsiveValue";
import MatchBoardContent from "components/mySquad/MatchBoardContent";
import {
    controlsHandler,
    scrollRenderer,
    tabClickHandler,
    MAKE_TRANSFERS,
    setInitialSettings
} from "utils/matchBoardHelper";

// Animations
import {scrollAnimation, borderAnimation, subHeadingAnimation} from "Animations/matchBoard/MatchBoardAnimation";

// Actions
import {
    getGameWeeks,
    getMatchFixturesForGameWeek
} from "redux/MatchFixtures/api";
import {isEmpty} from "../../utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        scrollContainer:{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: R(1080)
        },
        item: {
            // height: 'max-content',
            cursor: 'pointer',
            display: 'inline-flex',
            textAlign: 'center',
            background: 'white',
            marginLeft: R(35),
            marginRight: R(35),
            opacity: 0,
        },
        subHeading: {
            color: colors.regent_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px')
        },
        borderStyle: {
            height: R(2),
            position: 'absolute',
            background: colors.mandy,
            marginTop: R(20),
        },
        calendarIcon: {
            position: 'absolute',
            top: R(15),
            left: R(23)
        }
    }
}

export default function MatchBoard () {

    const STYLES =  { ...getStyles(R) }

    const [gameWeeks, setGameWeeks] = useState([])

    const scrollContainerRef = useRef()
    let activeRef = useRef()

    const controls = useAnimation()
    const dispatch = useDispatch()
    const borderAnimationControls = useAnimation()

    const [moved, setMoved] = useState(0)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)
    const [activeTabContent, setActiveTabContent] = useState({})
    const scrollBoxOriginPointForBorder = R(517.421)
    const scrollBoxOriginPoint = R(417)

    // Global States
    const user = useSelector(({ auth }) => auth.user);

    const handleTabClick = async (gw) => {
        if(animationInProgress) return
        tabClickHandler({
            activeGameWeek: gw.gameweek,
            gameWeeks,
            setGameWeeks,
        })
    }

    const handleControls = (isNext = false) => {
        if(animationInProgress) return
        controlsHandler({
            isNext,
            gameWeeks,
            setGameWeeks,
        })
    }

    useEffect(() => {
        updateContentOnGameWeekChange()
        if(!isEmpty(gameWeeks)){
         setTimeout(() => {
                scrollRenderer({
                    activeRef,
                    scrollContainerRef,
                    scrollBoxOriginPoint,
                    moved,
                    setMoved,
                    setBorderWidth,
                })
         }, 100)
        }
    }, [gameWeeks])

    const fetchGameWeeks = async () => {
        const { success, data } = await dispatch(getGameWeeks({seasonId: user.currentSeason}))
        if(!success) return
        setInitialSettings({
            initialGameWeeks: data,
            setGameWeeks,
        })
    }

    const updateContentOnGameWeekChange = async () => {

        if(!gameWeeks.length) return
        const activeWeekId = gameWeeks.find(gw => gw.active === true).gameweek
        const res = await dispatch(getMatchFixturesForGameWeek({gameWeek: activeWeekId}))
        if(!res.success) return

        setActiveTabContent({
            toggleAnimation: !activeTabContent.toggleAnimation,
            data: res.data
        })
    }

    // Run Animations
    useEffect(() => {
        controls.start('scroll')
        borderAnimationControls.start('borderWidth')
        controls.start('changeTextColor')
    }, [moved])

    // Did Mount
    useEffect(() => {
        fetchGameWeeks()
    }, [])

    const onAnimationComplete = (definition) => {
        if(definition === 'borderWidth') {
            setAnimationInProgress(false)
        }
    }

    return (
        <Div
            minH={720}
            pt={40}
            pb={50}
            w={1280}
            className={'bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >
            <Div justifyBetween ml={40} mr={40} mb={40}>
                <Text text={'MATCHES'} fs={34} fw={900} lh={38} color={colors.black_rock} fst={'italic'} />
                <Div position={'relative'} cursor={'pointer'}>
                    <Button title={'Sync to calendar'} h={50} pr={24} pl={55} pt={15} pb={15}/>
                    <div style={STYLES.calendarIcon}>
                        <Image w={20} h={20} src={'/images/calendar.png'}/>
                    </div>
                </Div>
            </Div>

            {/*Tabs*/}
            <Div position={'relative'} style={STYLES.scrollBox}>
                <Div className={'flex justify-center'}>
                    <div style={{...STYLES.scrollContainer}}
                         ref={scrollContainerRef}
                    >
                        {
                            !isEmpty(gameWeeks) && gameWeeks.map((gw) => {
                                return(
                                    <motion.div
                                        variants={scrollAnimation}
                                        animate={controls}
                                        custom={{
                                            gw,
                                            moved
                                        }}
                                        key={gw.id}
                                        className={'flex flex-col items-center'}
                                        style={{...STYLES.item}}
                                    >
                                        <div
                                            className={'flex flex-col items-center'}
                                            ref={gw.active ? activeRef : null}
                                            onClick={() => handleTabClick(gw)}
                                        >
                                            <Text text={`Gameweek ${gw.gameweek}`} color={colors.regent_grey} fs={18} lh={26}/>
                                            <motion.p
                                                variants={subHeadingAnimation}
                                                animate={controls}
                                                custom={gw}
                                                className={'italic uppercase font-[700]'}
                                                style={STYLES.subHeading}
                                            >
                                                {
                                                    gw.deadline !== MAKE_TRANSFERS
                                                        ? dayjs(gw.deadline).format('DD MMM')
                                                        : gw.deadline
                                                }
                                            </motion.p>
                                        </div>

                                    </motion.div>
                                )
                            })
                        }
                    </div>

                </Div>

                <Div position='absolute' top={1} left={40}>
                    <Image w={60} h={60} src={'/images/arrow-prev.png'} cursor={'pointer'} onClick={() => handleControls()}/>
                </Div>
                <Div position='absolute' top={1} right={40}>
                    <Image w={60} h={60} src={'/images/arrow-next.png'} cursor={'pointer'}
                           onClick={() => handleControls(true)} alt={'arrow-next'}/>
                </Div>

                <motion.div
                    variants={borderAnimation}
                    animate={borderAnimationControls}
                    custom={{borderWidth}}
                    onAnimationStart={() => setAnimationInProgress(true)}
                    onAnimationComplete={(definition) => onAnimationComplete(definition)}
                    style={{
                        ...STYLES.borderStyle,
                        width: borderWidth,
                        left: scrollBoxOriginPointForBorder
                    }}
                />
            </Div>
            {/*Content*/}
            {
                !isEmpty(activeTabContent) && (
                    <Div mt={30} center><MatchBoardContent activeTabContent={activeTabContent}/></Div>
                )
            }
        </Div>
    )

}