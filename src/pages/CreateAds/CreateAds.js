import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    CustomSelect, DatePicker,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Group,
    Header,
    Input, NativeSelect,
    Panel,
    PanelHeader, Textarea,
} from '@vkontakte/vkui';
import {BasePage} from "../BasePage/BasePage";

const CreateAds = ({ id, navigationHandler, active }) => {
    // const days = [
    //     {value: 'mon', label: 'Понедельник'},
    //     {value: 'tue', label: 'Вторник'},
    //     {value: 'wen', label: 'Среда'},
    //     {value: 'thu', label: 'Четверг'},
    //     {value: 'fri', label: 'Пятница'},
    //     {value: 'sat', label: 'Суббота'},
    //     {value: 'sun', label: 'Воскресенье'},
    // ];
    const [selectedDateTo, setSelectedDateTo] = useState({});

    const now = new Date();
    const hours = [...Array(24).keys()];
    const minutes = [...Array(60).keys()];

    return (
        <BasePage id={id} headerText='Создание объявления' active={active} navigationHandler={navigationHandler}>
            <Group header={<Header mode="secondary">Введите данные о своих перемещения</Header>}>
                <FormLayout>
                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Откуда">
                            <Input />
                        </FormItem>
                        <FormItem top="Куда">
                            <Input />
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem top="День">
                        <DatePicker
                            min={{day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear()}}
                            defaultValue={{day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear()}}
                            onDateChange={(value) => {console.log(value)}}
                            dayPlaceholder="ДД"
                            monthPlaceholder="ММММ"
                            yearPlaceholder="ГГГГ"
                        />
                    </FormItem>
                    <FormItem top="Отправление" />
                    <FormLayoutGroup mode="horizontal" top="Отправление">
                        <FormItem top="Часы">
                            <NativeSelect>
                                {hours.map((hour) => (
                                    <option value={hour}>{hour}</option>
                                ))}
                            </NativeSelect>
                        </FormItem>
                        <FormItem top="Минуты">
                            <NativeSelect>
                                {minutes.map((minute) => (
                                    <option value={minute}>{minute}</option>
                                ))}
                            </NativeSelect>
                        </FormItem>
                    </FormLayoutGroup>

                    <FormItem top="Прибытие" />
                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Часы">
                            <NativeSelect>
                                {hours.map((hour) => (
                                    <option value={hour}>{hour}</option>
                                ))}
                            </NativeSelect>
                        </FormItem>
                        <FormItem top="Минуты">
                            <NativeSelect>
                                {minutes.map((minute) => (
                                    <option value={minute}>{minute}</option>
                                ))}
                            </NativeSelect>
                        </FormItem>
                    </FormLayoutGroup>
                    <FormLayoutGroup mode="vertical">
                        <FormItem top="Оплата">
                            <Input />
                        </FormItem>
                        <FormItem top="Комментарии">
                            <Textarea placeholder="Я очень вредный" />
                        </FormItem>
                    </FormLayoutGroup>
                </FormLayout>
            </Group>
        </BasePage>
    );
};

CreateAds.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CreateAds;

// locationFrom
// locationTo
// timeFrom
// timeTo
// minPrice