import React from "react";
import { useState } from "react";
import { format, getDate, isSameDay } from "date-fns";
import useCalendar, { WEEKS } from "./useCalendar.js";
import * as Styled from "./Calendar-styled";
import styled from "styled-components";

const Calendar = ({ selectDay, setSelectDay }) => {
  const [startDay, setStartDay] = useState(new Date());
  const calendar = useCalendar(startDay, setStartDay);

  const selectDate = (date) => {
    setSelectDay(date);
  };

  return (
    <div>
      <Styled.Calendar>
        <thead>
          <tr>
            <td colSpan="100%">
              {format(startDay, "MMMM ")}
              {format(startDay, "yyyy")}
              <PreMonthBtn onClick={calendar.setPreMonth}>◀</PreMonthBtn>
              <NextMonthBtn onClick={calendar.setNextMonth}>▶</NextMonthBtn>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {WEEKS.map((title, i) => {
              return <td key={i}>{title}</td>;
            })}
          </tr>
          {calendar.days.map((week, i) => {
            return (
              <tr key={i}>
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
                    <td key={i} className={className} onClick={selectedToday}>
                      {getDate(date.date)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Styled.Calendar>
    </div>
  );
};

const PreMonthBtn = styled.button`
  border-color: transparent;
  background-color: #fff;
  margin-right: 30px;
`;
const NextMonthBtn = styled.button`
  border-color: transparent;
  background-color: #fff;
  margin-left: 30px;
`;

export default Calendar;
