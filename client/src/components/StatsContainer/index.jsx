import StatsItem from "../StatsItem"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/StatsContainer"
import { defaultStats } from "./defaultStats"

const StatsContainer = () => {
     const { stats } = useAppContext()

  return (
    <Wrapper>
        { defaultStats(stats).map((item, index) => (
            <StatsItem key={index} {...item} />
        )) }
    </Wrapper>
  )
}

export default StatsContainer