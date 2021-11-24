import React, { Dispatch, SetStateAction } from 'react';
import { BasePage, BasePageProps } from '../BasePage/BasePage';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';
import { customFetch } from '../../helpers/customFetch/customFetch';
import { BackendPaths } from '../../enums/BackendPaths';

type MyAdsListPageProps = BasePageProps & {
    setAdData: any;
};

export const MyAdsListPage = ({ id, navigationHandler, active, setAdData }: MyAdsListPageProps) => {
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        customFetch(BackendPaths.MyAdsList)
            .then(({ data }) => {
                if (data === 'no data') {
                    setCards([]);
                    return;
                }
                setCards(data);
            })
            .catch((error) => {
                console.log(error);
                setCards([]);
            });
    }, []);

    return (
        <BasePage id={id} active={active} navigationHandler={navigationHandler} headerText="Мои объявления">
            <DeliveryAdsList cards={cards} setActivePanel={navigationHandler} setAdData={setAdData} isMy />
        </BasePage>
    );
};
