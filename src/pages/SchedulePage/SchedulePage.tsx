import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { Schedule } from '../../components/Schedule/Schedule';
import { BasePage, BasePageProps } from '../BasePage/BasePage';

type SchedulePageProps = BasePageProps & {
    onClickAddSchedule: () => void;
};

export const SchedulePage: FC<SchedulePageProps> = ({ id, active, navigationHandler, onClickAddSchedule }) => {
    return (
        <BasePage
            id={id}
            active={active}
            navigationHandler={navigationHandler}
            header={
                <PanelHeader
                    left={
                        <PanelHeaderButton>
                            <Icon28ChevronLeftOutline
                                onClick={() => {
                                    navigationHandler('profile');
                                }}
                            />
                        </PanelHeaderButton>
                    }
                >
                    Моё расписание
                </PanelHeader>
            }
        >
            <Schedule onClickAddSchedule={onClickAddSchedule} />
        </BasePage>
    );
};
