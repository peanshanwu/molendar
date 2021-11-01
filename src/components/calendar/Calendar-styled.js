import styled from 'styled-components'
import * as Color from '../layout/Color'

export const Calendar = styled.table`
	color: #1c2126;

	&,
	td,
	tr {
		/* border: 1px solid black; */
		height: 40px;
	}
	td {
		width: 40px;
		text-align: center;
		&.selected {
				background-color: #ccc;
		}
		&.other{
				color: #a6a6a6;
		}
		&:hover {
				cursor: pointer;
				/* background-color: #1c2126;
				border-radius: 50%;
				color: #ccc; */
		}
	}
`

export const PersonalCalendar = styled.table`
	color: ${Color.Content};

	&,
	td,
	tr {
		/* border: 1px solid black; */
		height: 213px;
	}
	td {
		border: 1px solid gray;
		padding: 2px;
		width: 142px;
		text-align: center;
		&.selected {
				background-color: ${Color.Background};
				/* color: ${Color.Main}; */
		}
		&.other{
				color: ${Color.Dark};
		}
		&:hover {
				cursor: pointer;
				/* background-color: #1c2126;
				border-radius: 50%;
				color: #ccc; */
		}
	}
`