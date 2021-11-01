import React from 'react'
import { useState } from 'react'
import { format, getDate, isSameDay} from 'date-fns'
import useCalendar, { WEEKS } from '../../components/calendar/useCalendar.js'
import * as Styled from '../../components/calendar/Calendar-styled'
import styled from 'styled-components'
import Info from './Info'

const PersonalCalendar = ({ selectDay, setSelectDay }) => {
	
	const [startDay, setStartDay] = useState(new Date())
	const [popupClick, setPopupClick] = useState(false)
	const calendar = useCalendar(startDay, setStartDay)
	
	const selectDate = (date) => {
		setSelectDay(date)
	}
	

  
  return (
    <>

			<Info popupClick={popupClick} setPopupClick={setPopupClick}/>

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
											onClick={() => {
												selectedToday()
												setPopupClick(true)
											}}
										>
                      {getDate(date.date)}

                      {/* 判斷是否符合日期，如符合，則render出img */}
                      {/* {isSameDay(date.date, new Date(2021, 9, 28, 0, 0)) && <img src="https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg" alt="" />} */}
                      {isSameDay(date.date, new Date(2021, 10, 1, 0, 0))
												&&
												<MovieContainer>
													<Mask />
												
                        	<Poster src="https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg" alt="" />
												</MovieContainer>
											}
										</td>
									)
								})}
							</tr>
						)
						})}
				</tbody>
			</Styled.PersonalCalendar>
    </>
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
`
// const Poster = styled.div`
//   width: 100%;
// 	height: 300px;
// 	background-image: url(https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg);
// 	background-size: contain;
// `
const Td = styled.td`
	background-image: url(https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg);
	background-size: contain;
`
const MovieContainer = styled.div`
	width: 100%;
	position: relative;
`
const Mask = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, .5);
	transition: ease-in .3s;
	&:hover {
		background-color: rgba(0, 0, 0, 0);
	}
`



export default PersonalCalendar
