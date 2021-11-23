import React, { Dispatch, SetStateAction } from 'react';
import { BasePage, BasePageProps } from '../BasePage/BasePage';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';

type MyAdsListPageProps = BasePageProps & {
    setActiveView: Dispatch<SetStateAction<string>>;
    setAdData: any;
};

export const MyAdsListPage = ({ id, navigationHandler, active, setActiveView, setAdData }: MyAdsListPageProps) => {
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {}, []);

    return (
        <BasePage id={id} active={active} navigationHandler={navigationHandler} headerText="Мои объявления">
            <DeliveryAdsList cards={cards} setActiveView={setActiveView} setAdData={setAdData} />
        </BasePage>
    );
};
