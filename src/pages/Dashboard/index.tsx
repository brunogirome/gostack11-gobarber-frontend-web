import React, { useState } from 'react';

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

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

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
        <Calendar>Calendar</Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
