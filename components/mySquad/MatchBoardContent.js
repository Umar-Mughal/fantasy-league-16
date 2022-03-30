// Components
import Div from "components/html/Div"
import MatchDate from "components/mySquad/MatchDate";
import MatchRow from "components/matches/MatchRow";

export default function MatchBoardContent({
    activeTabContent,
}){

    const { matchesOnDates } = activeTabContent.data
    const { toggleAnimation } = activeTabContent

    return (
        <div className={'w-full'}>
            {
               matchesOnDates && matchesOnDates.length > 0 && matchesOnDates.map((matchDate, index) => {
                   const parentIndex = index
                    return (
                        <div key={parentIndex} >
                            <MatchDate tabChanged={toggleAnimation} initialOpacity={0} matchDate={matchDate}/>
                            {
                                matchDate.matches.map((match, index) => (
                                    <Div key={index} mt={50}>
                                        <MatchRow
                                            match={match}
                                            index={index}
                                            parentIndex={parentIndex}
                                            tabChanged={toggleAnimation}
                                            initialOpacity={0}
                                        />
                                    </Div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>

    )
}