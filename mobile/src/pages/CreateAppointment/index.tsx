import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import { Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Calendar from '../../components/Calendar';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  CalendarContainer,
  Title,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  const { goBack, navigate } = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    api
      .get<MonthAvailabilityItem[]>(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        },
      )
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Provider[]>('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<AvailabilityItem[]>(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            day: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          },
        },
      )
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedHour(0);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post(`/appointments`, {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Erro ao criar agendament',
        'Ocorreu um erro ao tentar criar agendamento. Tente novamente',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const disabledDays = useMemo(
    () =>
      monthAvailability
        .filter(monthDay => !monthDay.available)
        .map(
          monthDay =>
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              monthDay.day,
            ),
        ),
    [currentMonth, monthAvailability],
  );

  const morningAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour < 12)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        })),
    [availability],
  );

  const afternoonAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 12)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        })),
    [availability],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={provider => provider.id}
            data={providers}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <CalendarContainer>
          <Title>Escolha a data</Title>
          <Calendar
            showPastDate={false}
            disableDays={{
              weekDays: [0, 6],
              days: disabledDays,
            }}
            weekNames={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
            monthNames={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            onSelectDate={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </CalendarContainer>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent horizontal>
              {morningAvailability.map(({ hour, hourFormatted, available }) => (
                <Hour
                  key={hourFormatted}
                  enabled={available}
                  available={available}
                  selected={hour === selectedHour}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent horizontal>
              {afternoonAvailability.map(
                ({ hour, hourFormatted, available }) => (
                  <Hour
                    key={hourFormatted}
                    enabled={available}
                    available={available}
                    selected={hour === selectedHour}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={hour === selectedHour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
