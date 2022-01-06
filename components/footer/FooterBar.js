// Components
import PrimaryButton from "components/buttons/PrimaryButton";
import Border from "components/Borders/Border";

// Utils
import R from "utils/getResponsiveValue";

// Colors
import colors from "constants/colors";
import {nFormatter} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(104),
            paddingLeft: R(81.26),
            paddingRight: R(81.26)
        },
        playersText: {
            fontSize: R(18),
            marginRight: R(14),
            lineHeight: R(26, 'px')
        },
        totalPlayers: {
            fontSize: R(28),
            marginRight: R(32),
            lineHeight: R(32, 'px')
        },
        RBText: {
            fontSize: R(18),
            marginLeft: R(32)
        },
        infoText: {
            width: R(178),
            height: R(32)
        },
        infoImage: {
            width: R(21),
            height: R(21),
            marginLeft: R(9),
            marginRight: R(17),
        },
        remainingBudget: {
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            fontWeight: '800'
        },
        autoPickBtn: {
            boxShadow: 'unset',
            background: 'white',
            height: R(50),
            width: R(190),
        },
        resetBtn: {
            boxShadow: 'unset',
            background: colors.rhino,
            height: R(50),
            width: R(190)
        },
        continueBtn: {
            height: R(50),
            width: R(163)
        }
    }
}
export default function FooterBar({
    totalChosenPlayers,
    remainingBudget,
    resetDisabled,
    onAutoPick,
    autoPickDisabled,
    continueDisabled,
                                      onResetClick,
                                      onContinueClick
  }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div
            className="footer-blue-gradient fixed bg-red-200 w-full bottom-[0] flex items-center"
            style={STYLES.container}
        >
            <div className={'flex items-center justify-between w-full'}>
                {/*Left Section*/}
                <div className={'flex items-center'}>
                    <p className={'text-lavender_grey normal'} style={STYLES.playersText}>Players</p>
                    <p className={'italic text-white font-[800]'} style={STYLES.totalPlayers}>
                        {totalChosenPlayers} / 15
                    </p>
                    <Border/>
                    <p className={'text-lavender_grey normal'} style={STYLES.RBText}>Remaining budget</p>
                    <div className={'relative'}>
                        <p className={'absolute'} style={STYLES.infoText}>You need to exchange some
                            players for cheaper ones</p>
                        <div style={STYLES.infoImage}>
                            <img src="/images/info.png" alt="" width={'100%'} height={'100%'}/>
                        </div>
                    </div>
                    <p className={`italic uppercase`}
                       style={{
                           ...STYLES.remainingBudget,
                           color: remainingBudget > 0 ? colors.white : colors.bean_red
                       }}>
                        {remainingBudget < 0 && '-'} {nFormatter(Math.abs(remainingBudget))}
                    </p>
                </div>

                {/*Right Section*/}
                <div className={'flex items-center text-black_rock'}>
                    <PrimaryButton
                        title={'auto pick'}
                        textClasses={'text-black_rock'}
                        disabled={autoPickDisabled}
                        buttonStyle={{ marginRight: R(16)}}
                        style={STYLES.autoPickBtn}
                        onClick={onAutoPick}
                    />
                    <PrimaryButton
                        title={'reset'}
                        textClasses={'text-white'}
                        disabled={resetDisabled}
                        buttonStyle={{marginRight: R(40)}}
                        style={STYLES.resetBtn}
                        onClick={onResetClick}
                    />
                    <PrimaryButton
                        onClick={onContinueClick}
                        title={'continue'}
                        textClasses={'text-white'}
                        disabled={continueDisabled}
                        style={STYLES.continueBtn}
                    />
                </div>
            </div>

        </div>
    )
}