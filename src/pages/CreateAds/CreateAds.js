import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './CreateAds.css';
import {
    Button,
    FixedLayout,
    FormItem,
    FormLayout,
    Group,
    Input,
    Textarea,
} from '@vkontakte/vkui';
import {BasePage} from "../BasePage/BasePage";
import {getMasked} from '../../helpers/mask/mask';
import {createAd} from './modules';

export const CreateAds = ({ id, navigationHandler, active, setPopout, setActivePanel }) => {
    const [locationFrom, setLocationFrom] = useState('');
    const [locationTo, setLocationTo] = useState('');
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [extra, setExtra] = useState('');
    const [price, setPrice] = useState('');

    const [error, setError] = useState(false);

    const handleChangeTime = (evt) => {
        const {target} = evt;
        const masked = getMasked(target.value);

        setTime(masked);
    };

    const handleChangePrice = (evt) => {
        const {target} = evt;

        if (isNaN(Number(target.value))) {
            return;
        }

        setPrice(target.value);
    };

    const handleClick = () => {
        if (!locationFrom || !locationTo || !time || !subject || !price) {
            setError(true);
            return;
        }

        if (time.length !== 5) {
            setError(true);
            return;
        }

        setPopout(true);

        const now = new Date();

        createAd(
            locationFrom,
            locationTo,
            `${new Intl.DateTimeFormat('ru', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(now)} ${time}`,
            Number(price),
            extra,
            subject
        )
            .then(({ ok, statusCode }) => {
                console.log('modules');
                setPopout(false);
                if (!ok) {
                    console.error(`/api/ad: ${statusCode}`);
                    return;
                }

                setActivePanel('profile');
            })
            .catch((err) => {
                console.error(err);
                setPopout(false);
            });
    };

    return (
        <BasePage id={id} headerText='Создание' active={active} navigationHandler={navigationHandler}>
            <Group>
                <FormLayout>
                    <FormItem
                        top="Откуда доставить"
                        status={!locationFrom && error && 'error'}
                        bottom={!locationFrom && error && 'Обязательное поле'}
                    >
                        <Input placeholder="Общежитие №4" value={locationFrom} onChange={(evt) => { setLocationFrom(evt.target.value); }} />
                    </FormItem>
                    <FormItem
                        top="Куда доставить"
                        status={!locationTo && error && 'error'}
                        bottom={!locationTo && error && 'Обязательное поле'}
                    >
                        <Input placeholder="УЛК МГТУ им. Баумана" value={locationTo} onChange={(evt) => { setLocationTo(evt.target.value); }} />
                    </FormItem>
                    <FormItem
                        top="Время доставки"
                        className="time"
                        status={(!time && error || time.length !== 5 && error) && 'error'}
                        bottom={!time && error ? 'Обязательное поле' : time.length !== 5 && error && 'Некорректные данные'}
                    >
                        <Input placeholder="14:20" value={time} onChange={handleChangeTime} />
                    </FormItem>
                    <FormItem
                        top="Что доставить"
                        status={!subject && error && 'error'}
                        bottom={!subject && error && 'Обязательное поле'}
                    >
                        <Input placeholder="Тубус" value={subject} onChange={(evt) => { setSubject(evt.target.value) }}/>
                    </FormItem>
                    <FormItem top="Описание">
                        <Textarea placeholder="5 комната, 8 этажа. Постучите три раза, прыгните два раза и вам откроют." value={extra} onChange={(evt) => { setExtra(evt.target.value); }}/>
                    </FormItem>
                    <FormItem
                        top="Предложите цену"
                        style={{ marginBottom: '50px' }}
                        status={!price && error && 'error'}
                        bottom={!price && error && 'Обязательное поле'}
                    >
                        <Input placeholder="Не выбрано" value={price} onChange={handleChangePrice}/>
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
