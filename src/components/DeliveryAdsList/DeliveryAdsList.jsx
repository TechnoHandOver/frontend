import * as React from 'react';

import { CardGrid, Footer } from '@vkontakte/vkui';
import { DeliveryAd } from '../DeliveryAd/DeliveryAd';
import { customFetch } from '../../helpers/customFetch/customFetch';

import './DeliveryAdsList.css';

export const DeliveryAdsList = function DeliveryAdsList({ cards, setActivePanel, setAdData }) {
    return (
        <div className="delivery-ads-list">
            <CardGrid size="l">
                {cards.map((item, index) => (
                    <DeliveryAd {...item} key={index} setAdData={setAdData} setActivePanel={setActivePanel} />
                ))}
                {!cards.length && (
                    <Footer>К сожалению, пока нет активных объявлений, создавайте объявления для работы сервиса</Footer>
                )}
            </CardGrid>
        </div>
    );
};
