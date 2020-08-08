import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber-Logo" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Wellcome</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Schedule</h1>
          <p>
            <span>Today</span>
            <span>Day 06</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next Appointment</strong>
            <div>
              <img
                src="https://avatarfiles.alphacoders.com/156/thumb-156175.png"
                alt="Oreimo avatar"
              />

              <strong>Ana Flávia</strong>
              <span>
                <FiClock />
                06:06
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:33
              </span>

              <div>
                <img
                  src="https://avatarfiles.alphacoders.com/156/thumb-156175.png"
                  alt="Oreimo avatar"
                />

                <strong>Ana Flávia</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:33
              </span>

              <div>
                <img
                  src="https://avatarfiles.alphacoders.com/156/thumb-156175.png"
                  alt="Oreimo avatar"
                />

                <strong>Ana Flávia</strong>
              </div>
            </Appointment>

            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                08:33
              </span>

              <div>
                <img
                  src="https://avatarfiles.alphacoders.com/156/thumb-156175.png"
                  alt="Oreimo avatar"
                />

                <strong>Ana Flávia</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:33
              </span>

              <div>
                <img
                  src="https://avatarfiles.alphacoders.com/156/thumb-156175.png"
                  alt="Oreimo avatar"
                />

                <strong>Ana Flávia</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
