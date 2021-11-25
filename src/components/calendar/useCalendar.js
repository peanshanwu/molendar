import { useState } from 'react'
import {
	addMonths,
	subMonths,
	getDaysInMonth,
	getDay,
	endOfMonth,
	setDate,
	startOfMonth,
} from 'date-fns'

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// 原作者寫法
// const useCalendar = () => {
	
// 	const [selectDay, setSelectDay] = useState(new Date())
// 	const [startDay, setStartDay] = useState(new Date())

// 	let month = []
// 	let currentDate = 1
// 	let firstDay = getDay(startOfMonth(selectDay))
// 	let allDays = getDaysInMonth(selectDay)
// 	let weekNums = Math.ceil((allDays + firstDay) / 7)
// 	let preMonth = subMonths(selectDay, 1)
// 	let preDate = endOfMonth(preMonth).getDate() - firstDay + 1
// 	let nextDate = 1
// 	let nextMonth = addMonths(selectDay, 1)

// 	const setNextMonth = () => {
// 		setSelectDay(addMonths(selectDay, 1))
// 	}

// 	const setPreMonth = () => {
// 		setSelectDay(subMonths(selectDay, 1))
// 	}

// 	const daysInMonth = () => {
// 		for (let weekNum = 0; weekNum < weekNums; weekNum++) {
// 			let week = []
// 			for (let day = 0; day < 7; day++) {
// 				let dateInfo = {
// 					otherMonth: false,
// 					date: null,
// 				}
// 				if (weekNum === 0 && day < firstDay) {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(preMonth, preDate),
// 						otherMonth: true,
// 					})
// 					preDate++
// 				} else if (currentDate > allDays) {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(nextMonth, nextDate),
// 						otherMonth: true,
// 					})
// 					nextDate++
// 				} else {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(selectDay, currentDate),
// 						otherMonth: false,
// 					})
// 					currentDate++
// 				}
// 			}
// 			month.push(week)
// 		}
// 		return month
// 	}

// 	const days = daysInMonth()
// 	const selectDate = (date) => {
// 		setSelectDay(date)
// 	}
// 	return {
// 		selectDay,
// 		days,
// 		setNextMonth,
// 		setPreMonth,
// 		selectDate,
// 	}
// }


// 改寫OK
// const useCalendar = () => {
	
// 	const [selectDay, setSelectDay] = useState(new Date())
// 	const [startDay, setStartDay] = useState(new Date())

// 	let month = []
// 	let currentDate = 1
// 	let firstDay = getDay(startOfMonth(startDay))
// 	let allDays = getDaysInMonth(startDay)
// 	let weekNums = Math.ceil((allDays + firstDay) / 7)
// 	let preMonth = subMonths(startDay, 1)
// 	let preDate = endOfMonth(preMonth).getDate() - firstDay + 1
// 	let nextDate = 1
// 	let nextMonth = addMonths(startDay, 1)

// 	const setNextMonth = () => {
// 		setStartDay(addMonths(startDay, 1))
// 	}

// 	const setPreMonth = () => {
// 		setStartDay(subMonths(startDay, 1))
// 	}

// 	const daysInMonth = () => {
// 		for (let weekNum = 0; weekNum < weekNums; weekNum++) {
// 			let week = []
// 			for (let day = 0; day < 7; day++) {
// 				let dateInfo = {
// 					otherMonth: false,
// 					date: null,
// 				}
// 				if (weekNum === 0 && day < firstDay) {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(preMonth, preDate),
// 						otherMonth: true,
// 					})
// 					preDate++
// 				} else if (currentDate > allDays) {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(nextMonth, nextDate),
// 						otherMonth: true,
// 					})
// 					nextDate++
// 				} else {
// 					week.push({
// 						...dateInfo,
// 						date: setDate(startDay, currentDate),
// 						otherMonth: false,
// 					})
// 					currentDate++
// 				}
// 			}
// 			month.push(week)
// 		}
// 		return month
// 	}

// 	const days = daysInMonth()
// 	const selectDate = (date) => {
// 		setSelectDay(date)
// 	}
// 	return {
// 		selectDay,
// 		days,
// 		setNextMonth,
// 		setPreMonth,
// 		selectDate,
// 	}
// }


const useCalendar = (startDay, setStartDay) => {
	
	// const [selectDay, setSelectDay] = useState(new Date())
	// const [startDay, setStartDay] = useState(new Date())

	let month = []
	let currentDate = 1
	let firstDay = getDay(startOfMonth(startDay))
	let allDays = getDaysInMonth(startDay)
	let weekNums = Math.ceil((allDays + firstDay) / 7)
	let preMonth = subMonths(startDay, 1)
	let preDate = endOfMonth(preMonth).getDate() - firstDay + 1
	let nextDate = 1
	let nextMonth = addMonths(startDay, 1)

	const setNextMonth = () => {
		setStartDay(addMonths(startDay, 1))
	}

	const setPreMonth = () => {
		setStartDay(subMonths(startDay, 1))
	}

	const daysInMonth = () => {
		for (let weekNum = 0; weekNum < weekNums; weekNum++) {
			let week = []
			for (let day = 0; day < 7; day++) {
				let dateInfo = {
					otherMonth: false,
					date: null,
				}
				if (weekNum === 0 && day < firstDay) {
					week.push({
						...dateInfo,
						date: setDate(preMonth, preDate),
						otherMonth: true,
					})
					preDate++
				} else if (currentDate > allDays) {
					week.push({
						...dateInfo,
						date: setDate(nextMonth, nextDate),
						otherMonth: true,
					})
					nextDate++
				} else {
					week.push({
						...dateInfo,
						date: setDate(startDay, currentDate),
						otherMonth: false,
					})
					currentDate++
				}
			}
			month.push(week)
		}
		return month
	}

	const days = daysInMonth()

	return {
		// selectDay,
		days,
		setNextMonth,
		setPreMonth,

	}
}


export default useCalendar
