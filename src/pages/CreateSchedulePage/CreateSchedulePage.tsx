import React, { FC } from 'react';
import { CreateSchedule } from '../../components/CreateSchedule/CreateSchedule';
import { BasePage, BasePageProps } from '../BasePage/BasePage';

type CreateSchedulePageProps = BasePageProps;

export const CreateSchedulePage: FC<CreateSchedulePageProps> = ({ id, navigationHandler, active }) => {
    return (
        <BasePage id={id} navigationHandler={navigationHandler} active={active} headerText="Создание расписания">
            <CreateSchedule />
        </BasePage>
    );
};
