import React from 'react'
import { useState } from 'react'
import { format, getDate, isSameDay, isAfter } from 'date-fns'
import useCalendar, { WEEKS } from './useCalendar.js'
import * as Styled from './Calendar-styled'
import styled from 'styled-components'
import HorizontalScroll from 'react-horizontal-scrolling'
import style from 'react-horizontal-scrolling/dist/style'

const PersonalCalendar = ({ selectDay, setSelectDay }) => {
	
	const [startDay, setStartDay] = useState(new Date())
	const calendar = useCalendar(startDay, setStartDay)
	
	const selectDate = (date) => {
		setSelectDay(date)
	}
	
	return (
			<Styled.PersonalCalendar>
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
            console.log(date.date);
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

                      {/* 判斷是否符合日期，如符合，則render出img */}
                      {/* {isSameDay(date.date, new Date(2021, 9, 28, 0, 0)) && <img src="https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg" alt="" />} */}
                      {isSameDay(date.date, new Date(2021, 9, 28, 0, 0))
                        &&
                        <Poster src="https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg" alt="" />}
										</td>
									)
								})}
							</tr>
						)
						})}
				</tbody>
			</Styled.PersonalCalendar>
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
const Poster = styled.img`
  width: 100%;
  margin-right: 20px;
`



export default PersonalCalendar
