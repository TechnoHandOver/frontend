import { FormLayout, FormItem, Group, Input, Select, Radio } from '@vkontakte/vkui';
import React, { FC } from 'react';

export const CreateSchedule: FC = () => {
    return (
        <Group>
            <FormLayout>
                <FormItem top="Откуда">
                    <Input placeholder="Начало маршрута" />
                </FormItem>
                <FormItem top="Куда">
                    <Input placeholder="Конечная точка маршрута" />
                </FormItem>
                <FormItem top="Неделя">
                    <Radio name="type">Чётная</Radio>
                    <Radio name="type">Нечётная</Radio>
                </FormItem>
                <FormItem top="День недели">
                    <Select
                        name="purpose"
                        options={[
                            {
                                value: '0',
                                label: 'Понедельник',
                            },
                            {
                                value: '1',
                                label: 'Вторник',
                            },
                            {
                                value: '2',
                                label: 'Среда',
                            },
                            {
                                value: '3',
                                label: 'Четверг',
                            },
                            {
                                value: '4',
                                label: 'Пятница',
                            },
                            {
                                value: '5',
                                label: 'Суббота',
                            },
                            {
                                value: '6',
                                label: 'Воскресенье',
                            },
                        ]}
                    />
                </FormItem>
            </FormLayout>
        </Group>
    );
};
