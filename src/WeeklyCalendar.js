import styled from "styled-components";
import { range, addDateBy, areDatesSame, getMonday } from "./utils";
import { useState } from "react";
const DAYS = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Чертверг",
  "Пятница",
  "Суббота",
  "Воскресение",
];
const HOUR_HEIGHT = 30;
const HOUR_MARGIN_TOP = 15;

export const WeeklyCalendar = () => {
  const [mondayDate, setMondayDate] = useState(getMonday);
  const hourNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));

  return (
    <>
      <FlexBox>
        <p>today: {new Date().toDateString()} </p>
        <p>from: {mondayDate?.toDateString()} </p>
        <p>to: {addDateBy(mondayDate, 6).toDateString()}</p>
        <button onClick={prevWeek}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button onClick={nextWeek}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </FlexBox>
      <Wrapper>
        <HGrid first={"30px"} cols={1}>
          <VGrid rows={24}>
            {range(24).map((hour) => (
              <Hour key={hour}>{hour}</Hour>
            ))}
          </VGrid>
          <HGrid cols={7}>
            {DAYS.map((day, index) => (
              <DayWrapper
                key={day}
                istoday={areDatesSame(new Date(), addDateBy(mondayDate, index))}
              >
                <p>{day}</p>
              </DayWrapper>
            ))}
          </HGrid>
        </HGrid>
        <HourLine
          fromtop={
            hourNow * HOUR_HEIGHT +
            HOUR_MARGIN_TOP +
            HOUR_HEIGHT / 2 +
            minutesNow / 2
          }
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: calc(100%-30px);
  border: 1px solid;
  margin: 15px;
  position: relative;
`;
const HGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ first }) => first || ""} repeat(
      ${({ cols }) => cols},
      1fr
    );
`;
const VGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  &:first-child {
    margin-top: ${HOUR_MARGIN_TOP}px;
  }
`;
const DayWrapper = styled.span`
  border: 1px solid red;
  background: ${({ istoday }) => (istoday ? "#f2cee6" : "grey")};
`;
const Hour = styled.span`
  height: ${HOUR_HEIGHT}px;
  display: flex;
  align-items: center;
`;

const HourLine = styled.div`
  position: absolute;
  width: 100%;
  top: ${({ fromtop }) => fromtop}px;
  border: 1px solid orange;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1.2rem;
  margin-top: 20px;
  button {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;
