import styled from "styled-components";
import * as Color from "../layout/Color";
import * as BreakPoint from "../../components/layout/BreakPoints"

// export const Calendar = styled.table`
//   color: ${Color.Sub};

//   &,
//   td,
//   tr {
//     /* border: 1px solid black; */
//     height: 70px;
//   }
//   td {
//     width: 70px;
//     text-align: center;
//     &.selected {
//       background-color: #ccc;
//     }
//     &.other {
//       color: #a6a6a6;
//       opacity: 0;
//     }
//     &:hover {
//       cursor: pointer;
//       /* background-color: #1c2126;
// 				border-radius: 50%;
// 				color: #ccc; */
//     }
//   }
// `;

export const IndexCalendar = styled.table`
  color: ${Color.Sub};
  font-weight: 300;
  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`;
export const IndexMonthControl = styled.tr`
  font-size: 2rem;
  position: relative;
  @media (max-width: ${BreakPoint.sm}) {
    font-size: 1.5rem;
  }
`;
export const IndexWeekTr = styled.tr`
  text-align: center;
  line-height: 4;
  height: 4rem;
`;
export const IndexTr = styled.tr`
  text-align: center;
`;
export const IndexTd = styled.td`
  padding-top: 12px;
  width: 3.2rem;
  height: 3.2rem;
  cursor: pointer;
  position: relative;
  transition: ease-in 0.3s;
  &.other {
    opacity: 0;
  }
  &.selected {
    background-color: ${Color.Sub};
    border-radius: 50%;
    color: ${Color.Content};
  }
  @media (max-width: 1000px) {
    width: 8rem;
    height: 3rem;
    &.selected {
      border-radius: 60px;
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
  @media (max-width: ${BreakPoint.sm}) {
    font-size: 1.8rem;
  }
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

  &.selected {
    color: ${Color.Main};
  }

  &.other {
    opacity: 0;
    border: transparent;
  }
  @media (max-width: 1000px) {
    height: 180px;
  }
  @media (max-width: ${BreakPoint.sm}) {
    height: 100px;
    border: 3px solid rgba(0, 0, 0, 0.05);
  }
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
