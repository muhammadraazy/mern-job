import { BarChart, CartesianGrid, XAxis , YAxis, Tooltip, Bar  } from "recharts";

const BarCharts = ({data}) => {

  return (
        <BarChart margin={{ top: 50 }} width={900} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={75} />
        </BarChart>
  )
}

export default BarCharts