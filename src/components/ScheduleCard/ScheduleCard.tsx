import { Button, RichCell } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { Api, RoutePerm } from '../../api/Api';
import { dayOfWeekMap } from './ScheduleCard.config';

interface ScheduleCardProps extends RoutePerm {}

export const ScheduleCard: FC<ScheduleCardProps> = ({ id, locDep, locArr, minPrice, timeArr, timeDep, dayOfWeek }) => {
    const handleChange = () => {};

    const handleDelete = () => {
        new Api().api
            .usersRoutesPermDelete(id || -1)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <RichCell
            multiline
            text={`Из ${locDep} в ${locArr}`}
            caption={`С ${timeDep} до ${timeArr}`}
            after={`${minPrice} руб.`}
            actions={
                <>
                    <Button onClick={handleChange}>Изменить</Button>
                    <Button mode="destructive" onClick={handleDelete}>
                        Удалить
                    </Button>
                </>
            }
        >
            {dayOfWeekMap[dayOfWeek || 'Mon']}
        </RichCell>
    );
};
