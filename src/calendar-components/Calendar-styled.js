import styled from 'styled-components'

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