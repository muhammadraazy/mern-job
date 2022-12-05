import {AreaChart, CartesianGrid, Tooltip, Area, XAxis, YAxis } from "recharts"

const AreaCharts = ({data}) => {
  return (
     <AreaChart height={350} width={900} data={data} margin={{ top: 50}}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
     </AreaChart>
  )
}

export default AreaCharts