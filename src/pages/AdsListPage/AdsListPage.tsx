import { debounce } from '@vkontakte/vkjs';
import { FixedLayout } from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { Modals } from '../../enums/Modals';
import { customFetch } from '../../helpers/customFetch/customFetch';
import { BasePage } from '../BasePage/BasePage';
import './AdsListPage.css';
// eslint-disable-next-line import/order
import {Ad} from "../../api/Api";

const delay = 500;
const backendUrl = 'https://handover.shop';

interface AdsListPageProps {
    id: string;
    priceFilter?: string;
    navigationHandler: Dispatch<SetStateAction<string>>;
    modalHandler?: Dispatch<SetStateAction<Modals | null>>;
    active: string;
    setAdData: Dispatch<SetStateAction<any>>;
    appStarted: boolean;
    order: string;

    currentUserId?: number;
}

export const AdsListPage: FC<AdsListPageProps> = ({
    id,
    navigationHandler,
    modalHandler,
    active,
    priceFilter,
    setAdData,
    appStarted,
    order,
    currentUserId,
}) => {
    const [cards, setCards] = React.useState<any>([]);
    const [fromLocation, setFromLocation] = React.useState('');
    const [toLocation, setToLocation] = React.useState('');

    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeFromInput = React.useCallback((evt) => {
        setFromLocation(evt.target.value);
    }, []);

    const onChangeToInput = React.useCallback((evt) => {
        setToLocation(evt.target.value);
    }, []);

    const onClickFilters = React.useCallback(() => {
        if (modalHandler) {
            modalHandler(Modals.SearchFilter);
        }
    }, [modalHandler]);

    const generateUrl = React.useCallback((fromLocation, toLocation, priceFilter, order) => {
        let result = `${backendUrl}/api/ads/search?`;
        if (fromLocation) {
            result += `loc_dep=${fromLocation}&`;
        }
        if (toLocation) {
            result += `loc_arr=${toLocation}&`;
        }
        if (priceFilter) {
            result += `max_price=${priceFilter}&`;
        }
        if (order) {
            result += `order=${order}`;
        }

        return result;
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const search = React.useCallback(
        debounce((fromLocation, toLocation, priceFilter, order, currentUserId) => {
            const url = generateUrl(fromLocation, toLocation, priceFilter, order);

            customFetch(`${url}`)
                .then(({ data }) => {
                    if (data === 'no data') {
                        setCards([]);
                        setIsLoading(false);
                        return;
                    }
                    let result = data;

                    if (currentUserId) {
                        result = data.filter((item: Ad) => {
                            const executorId = item.userExecutorVkId;

                            return !executorId || (executorId && executorId === currentUserId);
                        });
                    }

                    setCards(result);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setCards([]);
                    setIsLoading(false);
                });
        }, delay),
        [],
    );

    React.useEffect(() => {
        if (appStarted && currentUserId) {
            search(fromLocation, toLocation, priceFilter, order, currentUserId);
        }
    }, [fromLocation, toLocation, priceFilter, search, appStarted, order, currentUserId]);

    return (
        <BasePage
            id={id}
            header={
                <FixedLayout filled vertical="top">
                    <SearchPanel
                        fromInput={fromLocation}
                        onChangeFromInput={onChangeFromInput}
                        toInput={toLocation}
                        onChangeToInput={onChangeToInput}
                        onOpenModal={onClickFilters}
                    />
                </FixedLayout>
            }
            active={active}
            navigationHandler={navigationHandler}
        >
            <DeliveryAdsList
                isLoading={isLoading}
                cards={cards}
                setActivePanel={navigationHandler}
                setAdData={setAdData}
            />
        </BasePage>
    );
};
