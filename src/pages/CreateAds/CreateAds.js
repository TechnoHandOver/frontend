import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './CreateAds.css';
import {
    Button,
    CustomSelect, DatePicker,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Group,
    Header,
    Input, NativeSelect,
    Panel,
    PanelHeader, Select, Textarea,
} from '@vkontakte/vkui';
import {BasePage} from "../BasePage/BasePage";

export const CreateAds = ({ id, navigationHandler, active }) => {
    const now = new Date();

    const [locationFrom, setLocationFrom] = useState('');
    const [locationTo, setLocationTo] = useState('');
    const [date, setDate] = useState({ day: now.getDate(), month: now.getMonth(), year: now.getFullYear() });
    const [timeFrom, setTimeFrom] = useState({ hour: 0, minute: 0 });
    const [timeTo, setTimeTo] = useState({ hour: 0, minute: 0 });
    const [price, setPrice] = useState('');
    const [comment, setComment] = useState('');

    const hours = [...Array(24).keys()];
    const minutes = [...Array(60).keys()];

    const handleClick = () => {
        if (!locationFrom || !locationTo || !price) {
            return;
        }

        fetch('https://handover.space/api/ads/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locationFrom,
                locationTo,
                timeFrom: new Date(Date.UTC(date.year, date.month, date.day, timeFrom.hour, timeFrom.minute)).toISOString(),
                timeTo: new Date(Date.UTC(date.year, date.month, date.day, timeTo.hour, timeTo.minute)).toISOString(),
                minPrice: price.toString(),
                comment,
            }),
        }).then((response) => {
            console.log(response.json());
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <BasePage id={id} headerText='Создание объявления' active={active} navigationHandler={navigationHandler}>
            <Group header={<Header mode="secondary">Введите данные о своих перемещения</Header>}>
                <FormLayout>
                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Откуда">
                            <Input placeholder="Общежитие №2" value={locationFrom} onChange={(evt) => { setLocationFrom(evt.target.value); }} />
                        </FormItem>
                        <FormItem top="Куда">
                            <Input placeholder="УЛК МГТУ им. Баумана" value={locationTo} onChange={(evt) => { setLocationTo(evt.target.value); }} />
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem top="День">
                        <DatePicker
                            min={{day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear()}}
                            defaultValue={{day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear()}}
                            onDateChange={(value) => { setDate(value); }}
                            dayPlaceholder="ДД"
                            monthPlaceholder="ММММ"
                            yearPlaceholder="ГГГГ"
                        />
                    </FormItem>
                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Отправление">
                            <Select
                                defaultValue={0}
                                options={hours.map((hour, idx) => ({ value: idx, label: hour }))}
                                onChange={(evt) => {
                                    setTimeFrom((t) => ({
                                        hour: Number(evt.target.value),
                                        minute: t.minute,
                                    }))
                                }}
                            />
                        </FormItem>
                        <FormItem className="formItemLayout">
                            <Select
                                defaultValue={0}
                                options={minutes.map((minute, idx) => ({ value: idx, label: minute }))}
                                onChange={(evt) => {
                                    setTimeFrom((t) => ({
                                        hour: t.hour,
                                        minute: Number(evt.target.value),
                                    }))
                                }}
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Прибытие">
                            <Select
                                defaultValue={0}
                                options={hours.map((hour, idx) => ({ value: idx, label: hour }))}
                                onChange={(evt) => {
                                    setTimeTo((t) => ({
                                        hour: Number(evt.target.value),
                                        minute: t.minute,
                                    }));
                                }}
                            />
                        </FormItem>
                        <FormItem className="formItemLayout">
                            <Select
                                defaultValue={0}
                                options={minutes.map((minute, idx) => ({ value: idx, label: minute }))}
                                onChange={(evt) => {
                                    setTimeTo((t) => ({
                                        hour: t.hour,
                                        minute: Number(evt.target.value),
                                    }));
                                }}
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormLayoutGroup mode="vertical">
                        <FormItem top="Оплата">
                            <Input
                                placeholder="300"
                                value={price}
                                onChange={(evt) => { setPrice(evt.target.value); }}
                            />
                        </FormItem>
                        <FormItem top="Комментарии">
                            <Textarea
                                placeholder="Я очень вредный"
                                value={comment}
                                onChange={(evt) => { setComment(evt.target.value); }}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem>
                        <Button stretched size="l" onClick={handleClick}>Создать</Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </BasePage>
    );
};

CreateAds.propTypes = {
    id: PropTypes.string.isRequired,
};
