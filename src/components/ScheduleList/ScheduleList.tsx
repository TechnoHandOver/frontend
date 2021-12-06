import { Icon28AddOutline } from '@vkontakte/icons';
import { CellButton, Footer, Group } from '@vkontakte/vkui';
import React, { FC, useState } from 'react';
import './Schedule.css';

import { Api, RoutePerm } from '../../api/Api';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';

type ScheduleListProps = {
    onClickAddSchedule: () => void;
};

export const ScheduleList: FC<ScheduleListProps> = ({ onClickAddSchedule }) => {
    const [routes, setRoutes] = useState<RoutePerm[]>([]);

    React.useEffect(() => {
        new Api().api
            .usersRoutesPermListList()
            .then(({ data }) => {
                setRoutes(data.data || []);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {routes.length ? (
                <Group>
                    {routes.map((route, idx) => (
                        <ScheduleCard {...route} setRoutes={setRoutes} key={idx} />
                    ))}
                </Group>
            ) : (
                <Footer className="schedule">
                    Здесь пока нет вашего расписания
                    <br />
                    <br />
                    Добавляйте сюда свое расписание, чтобы бот отправлял вам оповещения о новых заказах в только удобное
                    для вас время.
                    <br /> <br />
                    Вам будет не обязательно заходить в приложение, чтобы узнать о новых заказах!
                </Footer>
            )}
            <Group className="schedule__add-schedule">
                <CellButton before={<Icon28AddOutline />} onClick={onClickAddSchedule}>
                    Добавить расписание
                </CellButton>
            </Group>
        </>
    );
};
