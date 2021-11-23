import * as React from 'react';

import { CardGrid, Footer } from '@vkontakte/vkui';
import { DeliveryAd } from '../DeliveryAd/DeliveryAd';
import { customFetch } from '../../helpers/customFetch/customFetch';

import './DeliveryAdsList.css';

export const DeliveryAdsList = function DeliveryAdsList({ cards, setActivePanel, setAdData, isMy = false }) {
    return (
        <div className="delivery-ads-list">
            <CardGrid size="l">
                {cards.map((item, index) => (
                    <DeliveryAd {...item} key={index} setAdData={setAdData} setActivePanel={setActivePanel} />
                ))}
                {!isMy && !cards.length && (
                    <Footer>К сожалению, пока нет активных объявлений, создавайте объявления для работы сервиса</Footer>
                )}
                {isMy && !cards.length && (
                    <Footer>История ваших объявлений пуста, создавайте объявления, чтобы увидеть их здесь</Footer>
                )}
            </CardGrid>
        </div>
    );
};
