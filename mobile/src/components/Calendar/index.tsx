import React, { useCallback, useMemo, useState } from 'react';
import { View, Dimensions, LayoutChangeEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  HeaderButton,
  Title,
  Row,
  Content,
  WeekContainer,
  WeekTitle,
  DayContainer,
  DayButton,
  DayText,
} from './styles';

const { width } = Dimensions.get('window');

const CONTAINER_WIDTH = width / 7;

const defaultWeekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const defaultMonthNames = [
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
];

interface CalendarProps {
  disableDays?: {
    weekDays?: Array<number>;
    days?: Array<Date>;
  };
  weekNames?: Array<string>;
  monthNames?: Array<string>;
  showPastDate?: boolean;
  onMonthChange?: (date: Date) => void;
  onSelectDate?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  disableDays = { weekDays: [], days: [] },
  weekNames = defaultWeekNames,
  monthNames = defaultMonthNames,
  showPastDate = true,
  onSelectDate,
  onMonthChange,
}) => {
  const [containerWidth, setContainerWidth] = useState(CONTAINER_WIDTH);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedMonth, selectedYear]);

  const startWeekDayOfMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth, 1).getDay();
  }, [selectedMonth, selectedYear]);

  const weeksInMonth = useCallback((array: Array<number> = [], size = 7): Array<
    Array<number>
  > => {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);

    return [head, ...weeksInMonth(tail, size)];
  }, []);

  const monthDays = useMemo(
    () =>
      weeksInMonth(
        Array.from({ length: daysInMonth + startWeekDayOfMonth }, (_, index) =>
          index < startWeekDayOfMonth ? 0 : index + 1 - startWeekDayOfMonth,
        ),
      ),
    [daysInMonth, startWeekDayOfMonth, weeksInMonth],
  );

  const selectedMonthText = useMemo(() => monthNames[selectedMonth], [
    monthNames,
    selectedMonth,
  ]);

  const isDisabledDay = useCallback(
    (weekDay: number, day: number) => {
      let disabled = false;

      if (disableDays || !showPastDate) {
        if (disableDays.weekDays) {
          disabled = disabled || disableDays.weekDays.includes(weekDay);
        }

        if (disableDays.days) {
          disabled =
            disabled ||
            !!disableDays.days.find(
              date =>
                date.getDate() === day &&
                date.getMonth() === selectedMonth &&
                date.getFullYear() === selectedYear,
            );
        }

        if (!showPastDate) {
          const today = new Date();
          disabled =
            disabled ||
            new Date(selectedYear, selectedMonth, day).getTime() <
              today.setDate(today.getDate() - 1);
        }
      }

      return disabled;
    },
    [disableDays, selectedMonth, selectedYear, showPastDate],
  );

  const nextMonth = useCallback(() => {
    let year = selectedYear;
    let month = selectedMonth;

    if (selectedMonth === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }

    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(1);

    onMonthChange && onMonthChange(new Date(year, month, 1));
  }, [onMonthChange, selectedMonth, selectedYear]);

  const previousMonth = useCallback(() => {
    let year = selectedYear;
    let month = selectedMonth;

    if (selectedMonth === 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }

    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(1);

    onMonthChange && onMonthChange(new Date(year, month, 1));
  }, [onMonthChange, selectedMonth, selectedYear]);

  const handleOnLayout = useCallback((event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setContainerWidth((layoutWidth - 16) / 7);
  }, []);

  const isShowPreviousMonth = useMemo(() => {
    if (!showPastDate) {
      const today = new Date();

      return (
        (selectedMonth > today.getMonth() &&
          selectedYear === today.getFullYear()) ||
        selectedYear > today.getFullYear()
      );
    }

    return true;
  }, [selectedMonth, selectedYear, showPastDate]);

  const handleSelectDay = useCallback(
    (weekDay: number, day: number) => {
      if (isDisabledDay(weekDay, day)) {
        return;
      }

      setSelectedDay(day);

      if (onSelectDate) {
        onSelectDate(new Date(selectedYear, selectedMonth, day));
      }
    },
    [isDisabledDay, onSelectDate, selectedMonth, selectedYear],
  );

  return (
    <Container onLayout={handleOnLayout}>
      <Header>
        <HeaderButton onPress={previousMonth} disabled={!isShowPreviousMonth}>
          {isShowPreviousMonth && (
            <Icon name="arrow-left" size={16} color="#F4EDE8" />
          )}
        </HeaderButton>

        <Title>{`${selectedMonthText} ${selectedYear}`}</Title>

        <HeaderButton onPress={nextMonth}>
          <Icon name="arrow-right" size={16} color="#F4EDE8" />
        </HeaderButton>
      </Header>

      <Content>
        <Row>
          {Array.from({ length: 7 }, (_, index) => index).map(week => (
            <WeekContainer
              key={week}
              style={{
                width: containerWidth,
              }}
            >
              <WeekTitle>{weekNames[week]}</WeekTitle>
            </WeekContainer>
          ))}
        </Row>

        {monthDays.map((week, index) => (
          <Row key={`${index}`}>
            {week.map((day, indexDay) => (
              <DayContainer key={`${day}-${indexDay}-${index}`}>
                <DayButton
                  activeOpacity={isDisabledDay(indexDay, day) ? 1 : 0.5}
                  isDisabledDay={day === 0 || isDisabledDay(indexDay, day)}
                  isSelected={day === selectedDay}
                  style={{
                    width: containerWidth - 8,
                    height: containerWidth - 8,
                  }}
                  onPress={() => handleSelectDay(indexDay, day)}
                >
                  <DayText
                    isDisabledDay={day === 0 || isDisabledDay(indexDay, day)}
                    isSelected={day === selectedDay}
                  >
                    {!!day && day}
                  </DayText>
                </DayButton>
              </DayContainer>
            ))}
          </Row>
        ))}
      </Content>
    </Container>
  );
};

export default Calendar;
