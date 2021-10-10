import * as React from 'react';

import {CardGrid} from "@vkontakte/vkui";
import {DeliveryAd} from "../DeliveryAd/DeliveryAd";
import {customFetch} from "../../helpers/customFetch/customFetch";

const cards = [
    {
        locationFrom: 'Общежитие №4 Измайлово',
        locationTo: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '500',
        timeFrom: '2021-10-02T12:00:00.000Z',
        timeTo: '2021-10-02T12:20:00.000Z',
    },
    {
        locationFrom: 'Общежитие №4 Мытищи',
        locationTo: 'УЛК',
        minPrice: '350',
        timeFrom: '2021-10-02T12:00:00.000Z',
        timeTo: '2021-10-02T12:20:00.000Z',
    },
    {
        locationFrom: 'Общежитие №4 Мытищи',
        locationTo: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '370',
        timeFrom: '2021-10-02T12:00:00.000Z',
        timeTo: '2021-10-02T12:20:00.000Z',
    },
    {
        locationFrom: 'Общежитие №10 (СМ)',
        locationTo: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '370',
        timeFrom: '2021-10-02T12:00:00.000Z',
        timeTo: '2021-10-02T12:20:00.000Z',
    }
]

const backendUrl = 'http://localhost:8080'

export const DeliveryAdsList = function DeliveryAdsList() {
    React.useEffect(() => {
        customFetch(`${backendUrl}/ads/list`).then(({data}) => {
            console.log(data);
        })
    }, [])

    return (
        <CardGrid size='l'>
            {cards.map((item, index) => (
                <DeliveryAd {...item} key={index}/>
            ))}
        </CardGrid>
    );
}