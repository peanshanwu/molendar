import styled from "styled-components";
import * as Color from "../layout/Color";

export const Calendar = styled.table`
  color: ${Color.Sub};

  &,
  td,
  tr {
    /* border: 1px solid black; */
    height: 70px;
  }
  td {
    width: 70px;
    text-align: center;
    &.selected {
      background-color: #ccc;
    }
    &.other {
      color: #a6a6a6;
      opacity: 0;
    }
    &:hover {
      cursor: pointer;
      /* background-color: #1c2126;
				border-radius: 50%;
				color: #ccc; */
    }
  }
`;

export const PersonalCalendar = styled.table`
  color: ${Color.Content};
  table-layout: auto;
  width: 100%;
  text-align: center;
`;
export const MonthControl = styled.tr`
  text-align: center;
  height: 100px;
  font-weight: 200;
  font-size: 2rem;
  /* & td {
    margin: 0 auto;
  } */
`;
export const Tr = styled.tr`
  border: 1px solid gray;
`;
export const Td = styled.td`
  border: 6px solid rgba(0, 0, 0, 0.05);
  position: relative;
  background-image: url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 14%;
  padding-top: 10px;
  transition: ease-in-out 0.5s;
  /* &::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  } */

  /* &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-image: url(${(props) => props.bgImg});
    background-repeat: no-repeat;
    background-size: cover;
  } */

  &.selected {
    color: ${Color.Main};
  }
  &.other {
    opacity: 0;
    border: transparent;
  }
  /* &:hover {
    cursor: pointer;
  } */
`;

//  export const PersonalCalendar = styled.table`
//   color: ${Color.Content};

//   &,
//   td,
//   tr {
//     /* border: 3px solid black; */
//     height: 213px;
//   }
//   td {
//     border: 1px solid gray;
//     padding: 2px;
//     width: 142px;
//     text-align: center;
//     &.selected {
//       background-color: ${Color.Background};
//       /* color: ${Color.Main}; */
//     }
//     &.other {
//       color: ${Color.Dark};
//     }
//     &:hover {
//       cursor: pointer;
//       /* background-color: #1c2126;
// 				border-radius: 50%;
// 				color: #ccc; */
//     }
//   }
// `;
