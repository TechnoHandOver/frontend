import React, { Dispatch, SetStateAction } from 'react';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';
import { BasePage } from '../BasePage/BasePage';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { SettingsIcon } from '../../images/settings/SettingsIcon';
import './AdsListPage.css';
import { FixedLayout, FormItem, Separator, Spacing } from '@vkontakte/vkui';
import { customFetch } from '../../helpers/customFetch/customFetch';
import { Modals } from '../../enums/Modals';
import { debounce } from '@vkontakte/vkjs';

const mocks = [
    {
        userAuthorVkId: 16233,
        locDep: 'Москва',
        locArr: 'Санкт-Петербург',
        minPrice: '500',
        dateTimeArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №4 Мытищи',
        locArr: 'УЛК',
        minPrice: '350',
        dateTimeArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №4 Мытищи',
        locArr: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '350',
        dateTimeArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №10 (СМ)',
        locArr: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '370',
        dateTimeArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
];

const delay = 500;
const backendUrl = 'https://handover.space';
enum QueryParams {
    LocDep,
    LocArr,
    MaxPrice,
}

interface AdsListPageProps {
    id: string;
    priceFilter?: string;
    navigationHandler: Dispatch<SetStateAction<string>>;
    modalHandler?: Dispatch<SetStateAction<Modals | null>>;
    active: string;
    setAdData: Dispatch<SetStateAction<any>>;
}

export const AdsListPage = function AdsListPage({
    id,
    navigationHandler,
    modalHandler,
    active,
    priceFilter,
    setAdData,
}: AdsListPageProps) {
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
    }, []);

    const generateUrl = React.useCallback((fromLocation, toLocation, priceFilter) => {
        let result = `${backendUrl}/api/ads/search?`;
        if (fromLocation) {
            result += `loc_dep=${fromLocation}&`;
        }
        if (toLocation) {
            result += `loc_arr=${toLocation}&`;
        }
        if (priceFilter) {
            result += `max_price=${priceFilter}`;
        }

        return result;
    }, []);

    const search = React.useCallback(
        debounce((fromLocation, toLocation, priceFilter) => {
            const url = generateUrl(fromLocation, toLocation, priceFilter);

            customFetch(`${url}`)
                .then(({ data }) => {
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
        }, delay),
        [],
    );

    React.useEffect(() => {
        search(fromLocation, toLocation, priceFilter);
    }, [fromLocation, toLocation, priceFilter]);

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
