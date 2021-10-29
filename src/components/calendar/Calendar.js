import React from 'react'
import { useState } from 'react'
import { format, getDate, isSameDay, isAfter } from 'date-fns'
import useCalendar, { WEEKS } from './useCalendar.js'
import * as Styled from './Calendar-styled'
import styled from 'styled-components'
import { logDOM } from '@testing-library/dom'

// const Calendar = ({ setSelectDay }) => {
	
// 	console.log(setSelectDay);
	
// 	const calendar = useCalendar()

// 	// const selectDate = (date) => {
// 	// 	setSelectDay(date)
// 	// }
	
// 	return (
// 		<div>
// 			<Styled.Calendar>
// 				<thead>
// 					<tr>
// 							<td colSpan="100%">
// 									<PreMonthBtn onClick={calendar.setPreMonth}>
// 									◀
// 									</PreMonthBtn>
// 									{format(calendar.selectDay, 'dd MM yyyy')}
// 									<NextMonthBtn onClick={calendar.setNextMonth}>
// 									▶
// 									</NextMonthBtn>
// 							</td>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					<tr>
// 							{WEEKS.map((title, i) => {
// 									return <td key={i}>{title}</td>
// 							})}
// 					</tr>
// 					{calendar.days.map((week, i) => {
// 						return (
// 							<tr key={i}>
// 								{week.map((date, i) => {
// 									const otherMonth = date.otherMonth
// 									const isSelected = isSameDay(
// 										calendar.selectDay,
// 										date.date,
// 									)
// 									const className = `${
// 										otherMonth && 'other'
// 									} ${isSelected && 'selected'}`
// 									const selectedToday = () => {
// 										calendar.selectDate(date.date)
// 										{/* selectDate(date.date) */}
// 									}
// 									return (
// 										<td
// 											key={i}
// 											className={className}
// 											onClick={selectedToday}
// 										>
// 											{getDate(date.date)}
// 										</td>
// 									)
// 								})}
// 							</tr>
// 						)
// 						})}
// 				</tbody>
// 			</Styled.Calendar>
// 		</div>
// 	)
// }

const Calendar = ({ selectDay, setSelectDay }) => {
	
	const [startDay, setStartDay] = useState(new Date())
	const calendar = useCalendar(startDay, setStartDay)
	
	const selectDate = (date) => {
		setSelectDay(date)
	}
	
	return (
		<div>
			<Styled.Calendar>
				<thead>
					<tr>
						<td colSpan="100%">
									<PreMonthBtn onClick={calendar.setPreMonth}>
									◀
									</PreMonthBtn>
									{format(startDay, 'MMMM ')}
									{format(startDay, 'yyyy')}
									<NextMonthBtn onClick={calendar.setNextMonth}>
									▶
									</NextMonthBtn>
							</td>
					</tr>
				</thead>
				<tbody>
					<tr>
							{WEEKS.map((title, i) => {
									return <td key={i}>{title}</td>
							})}
					</tr>
					{calendar.days.map((week, i) => {
						return (
							<tr key={i}>
								{week.map((date, i) => {
									const otherMonth = date.otherMonth
									const isSelected = isSameDay(
										selectDay,
										date.date,
									)
									const className = `${
										otherMonth && 'other'
									} ${isSelected && 'selected'}`
									const selectedToday = () => { selectDate(date.date) }
									return (
										<td
											key={i}
											className={className}
											onClick={selectedToday}
										>
											{getDate(date.date)}
										</td>
									)
								})}
							</tr>
						)
						})}
				</tbody>
			</Styled.Calendar>
		</div>
	)
}


const PreMonthBtn = styled.button`
	border-color: transparent;
	background-color: #fff;
	margin-right: 30px
`
const NextMonthBtn = styled.button`
	border-color: transparent;
	background-color: #fff;
	margin-left: 30px;
`



export default Calendar
