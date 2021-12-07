import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { format, getDate, isSameDay } from "date-fns";
import useCalendar, { WEEKS } from "./useCalendar.js";
import * as Color from "../layout/Color";
import { IndexMonthControl as MonthControl } from "./Calendar-styled";
import { IndexCalendar as DatePicker } from "./Calendar-styled";
import { IndexTr as Tr } from "./Calendar-styled";
import { IndexWeekTr as Week } from "./Calendar-styled";
import { IndexTd as Td } from "./Calendar-styled";

const Calendar = ({ selectDay, setSelectDay }) => {
  const [startDay, setStartDay] = useState(new Date());
  const calendar = useCalendar(startDay, setStartDay);

  const selectDate = (date) => {
    setSelectDay(date);
  };

  return (
    <div>
      <DatePicker>
        <thead>
          <MonthControl>
            <TdRelative colSpan="100%">
              {format(startDay, "MMMM ")}
              {format(startDay, "yyyy")}
              <IconWrap>
                <PreMonthBtn onClick={calendar.setPreMonth} />
                <NextMonthBtn onClick={calendar.setNextMonth} />
              </IconWrap>
            </TdRelative>
          </MonthControl>
        </thead>
        <tbody>
          <Week>
            {WEEKS.map((title, i) => {
              return <td key={i}>{title}</td>;
            })}
          </Week>
          {calendar.days.map((week, i) => {
            return (
              <Tr key={i}>
                {week.map((date, i) => {
                  const otherMonth = date.otherMonth;
                  const isSelected = isSameDay(selectDay, date.date);
                  const className = `${otherMonth && "other"} ${
                    isSelected && "selected"
                  }`;
                  const selectedToday = () => {
                    selectDate(date.date);
                  };
                  return (
                    <Td key={i} className={className} onClick={selectedToday}>
                      {getDate(date.date)}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </DatePicker>
    </div>
  );
};

const TdRelative = styled.td`
  position: relative;
`
const IconWrap = styled.div`
  position: absolute;
  top: 0;
  right: 12px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: center;
`;
const PreMonthBtn = styled.button`
  margin-right: 50px;
  margin-left: 20px;
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent ${Color.Background} transparent transparent;
`;
const NextMonthBtn = styled.button`
  margin-left: 20px;
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent ${Color.Background};
`;

export default Calendar;
