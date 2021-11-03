import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './CreateAds.css';
import {
    Button,
    CustomSelect, DatePicker, FixedLayout,
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
    // const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [extra, setExtra] = useState('');
    const [price, setPrice] = useState('');

    // const [date, setDate] = useState({ day: now.getDate(), month: now.getMonth(), year: now.getFullYear() });
    // const [timeFrom, setTimeFrom] = useState({ hour: 0, minute: 0 });
    // const [timeTo, setTimeTo] = useState({ hour: 0, minute: 0 });
    // const [price, setPrice] = useState('');
    // const [comment, setComment] = useState('');
    //
    // const hours = [...Array(24).keys()];
    // const minutes = [...Array(60).keys()];

    const handleClick = () => {
        // if (!locationFrom || !locationTo || !price) {
        //     return;
        // }

        // fetch('https://handover.space/api/ads/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         locationFrom,
        //         locationTo,
        //         timeFrom: new Date(Date.UTC(date.year, date.month, date.day, timeFrom.hour, timeFrom.minute)).toISOString(),
        //         timeTo: new Date(Date.UTC(date.year, date.month, date.day, timeTo.hour, timeTo.minute)).toISOString(),
        //         minPrice: Number(price),
        //         comment,
        //     }),
        // }).then((response) => {
        //     console.log(response.json());
        // }).catch((err) => {
        //     console.log(err);
        // });
    };

    return (
        <BasePage id={id} headerText='Создание' active={active} navigationHandler={navigationHandler}>
            <Group>
                <FormLayout>
                    <FormItem top="Откуда доставить">
                        <Input placeholder="Не выбрано" value={locationFrom} onChange={(evt) => { setLocationFrom(evt.target.value); }} />
                    </FormItem>
                    <FormItem top="Куда доставить">
                        <Input placeholder="Не выбрано" value={locationTo} onChange={(evt) => { setLocationTo(evt.target.value); }} />
                    </FormItem>
                    <FormItem top="Время доставки" className="time">
                        <Input placeholder="Не выбрано" value={time} onChange={(evt) => { setTime(evt.target.value); }} />
                    </FormItem>
                    <FormItem top="Что доставить">
                        <Input placeholder="Не выбрано" value={subject} onChange={(evt) => { setSubject(evt.target.value) }}/>
                    </FormItem>
                    <FormItem top="Описание">
                        <Textarea placeholder="Необязательное поле" value={extra} onChange={(evt) => { setExtra(evt.target.value); }}/>
                    </FormItem>
                    <FormItem top="Предложите цену" style={{ marginBottom: '50px' }}>
                        <Input placeholder="Не выбрано" value={price} onChange={(evt) => { setPrice(evt.target.value); }}/>
                    </FormItem>
                    <FixedLayout filled vertical="bottom" style={{ bottom: '50px' }}>
                        <FormItem>
                            <Button stretched size="l" onClick={handleClick}>Создать</Button>
                        </FormItem>
                    </FixedLayout>
                </FormLayout>
            </Group>
        </BasePage>
    );
};

CreateAds.propTypes = {
    id: PropTypes.string.isRequired,
};
