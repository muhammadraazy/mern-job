import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa"

export const defaultStats = (stats) => {
    return [
        { 
            title: 'Pending Applications', 
            count: stats?.pending || 0, 
            icon: <FaSuitcaseRolling />,
            color: '#e9b949', 
            bg: '#fcefc7' 
        },
        { 
            title: 'Interview Scheduled', 
            count: stats?.interview || 0, 
            icon: <FaCalendarCheck />, 
            color: '#647acb', 
            bg: '#e0e8f9' 
        },
        { 
            title: 'Jobs Declined', 
            count: stats?.declined || 0, 
            icon: <FaBug />, 
            color: '#d66a6a', 
            bg: '#ffeeee' 
        }
     ]
}