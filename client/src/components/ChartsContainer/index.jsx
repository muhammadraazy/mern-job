import {useState} from 'react'
import BarCharts from '../BarCharts'
import AreaCharts from '../AreaCharts'
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/ChartsContainer"

const ChartsContainer = () => {
    const { monthlyApplications: data } = useAppContext()
    const [barChart, setBarChart] = useState(true)

  return (
    <Wrapper>
        <h4> Monthly Applications </h4>
        <button type="button" onClick={() => setBarChart(!barChart)}> { barChart ? 'Area Chart' : "Bar Chart" } </button>
        { barChart ? <BarCharts data={data} /> : <AreaCharts data={data} /> }
    </Wrapper>
  )
}

export default ChartsContainer