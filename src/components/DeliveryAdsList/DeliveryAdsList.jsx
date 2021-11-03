import * as React from 'react';

import {CardGrid, Footer} from "@vkontakte/vkui";
import {DeliveryAd} from "../DeliveryAd/DeliveryAd";
import {customFetch} from "../../helpers/customFetch/customFetch";

import './DeliveryAdsList.css';

const mocks = [
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
    },
];


const backendUrl = 'https://handover.space';

export const DeliveryAdsList = function DeliveryAdsList() {
    const [cards, setCards] = React.useState(mocks);

    // React.useEffect(() => {
    //     customFetch(`${backendUrl}/api/ads/search`)
    //         .then(({data}) => {
    //             if (data === 'no data') {
    //                 setCards(mocks);
    //                 return;
    //             }
    //             setCards(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setCards(mocks);
    //         });
    // }, [])

    return (
        <div className='delivery-ads-list'>
            <CardGrid size='l'>
                {cards.map((item, index) => (
                    <DeliveryAd {...item} key={index}/>
                ))}
                {!cards.length && <Footer>К сожалению, пока нет активных объявлений, создавайте объявления для работы сервиса</Footer>}
            </CardGrid>
        </div>
    );
}