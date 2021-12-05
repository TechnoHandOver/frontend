import { Icon28AddOutline } from '@vkontakte/icons';
import { CellButton, Footer, Group } from '@vkontakte/vkui';
import React, { FC } from 'react';
import './Schedule.css';

type Schedule = {
    onClickAddSchedule: () => void;
};

export const Schedule: FC<Schedule> = ({ onClickAddSchedule }: Schedule) => {
    return (
        <>
            <Footer className="schedule">
                Здесь пока нет вашего расписания
                <br />
                <br />
                Добавляйте сюда свое расписание, чтобы бот отправлял вам оповещения о новых заказах в только удобное для
                вас время.
                <br /> <br />
                Вам будет не обязательно заходить в приложение, чтобы узнать о новых заказах!
            </Footer>
            <Group className="schedule__add-schedule">
                <CellButton before={<Icon28AddOutline />} onClick={onClickAddSchedule}>
                    Добавить расписание
                </CellButton>
            </Group>
        </>
    );
};
