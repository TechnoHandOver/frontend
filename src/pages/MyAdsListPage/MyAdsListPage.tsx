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
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        customFetch(BackendPaths.MyAdsList)
            .then(({ data }) => {
                debugger;
                if (data === 'no data') {
                    setCards([]);
                    setIsLoading(false);
                    return;
                }
                setCards(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setCards([]);
                setIsLoading(false);
            });
    }, []);

    return (
        <BasePage id={id} active={active} navigationHandler={navigationHandler} headerText="Мои объявления">
            <DeliveryAdsList
                isLoading={isLoading}
                cards={cards}
                setActivePanel={navigationHandler}
                setAdData={setAdData}
                isMy
            />
        </BasePage>
    );
};
