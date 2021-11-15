import React from 'react';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';
import { BasePage } from '../BasePage/BasePage';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { SettingsIcon } from '../../images/settings/SettingsIcon';
import './AdsListPage.css';
import { FixedLayout, FormItem, Separator, Spacing } from '@vkontakte/vkui';
import { customFetch } from '../../helpers/customFetch/customFetch';

const mocks = [
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №4 Измайлово',
        locArr: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '500',
        dateArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №4 Мытищи',
        locArr: 'УЛК',
        minPrice: '350',
        dateArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №4 Мытищи',
        locArr: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '350',
        dateArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
    {
        userAuthorVkId: 16233,
        locDep: 'Общежитие №10 (СМ)',
        locArr: 'ГЗ МГТУ им Н.Э. Баумана',
        minPrice: '370',
        dateArr: '02.01.2006 04:15',
        item: 'Зачётная книжка',
        comment: 'Просьба довезти осторожно, не трепать!',
    },
];

const backendUrl = 'https://handover.space';

interface AdsListPageProps {
  id: string;
  navigationHandler: Dispatch<SetStateAction<string>>;
  modalHandler?: Dispatch<SetStateAction<string>>;
  active: string;
}

export const AdsListPage = function AdsListPage({
  id,
  navigationHandler,
  modalHandler,
  active,
}: AdsListPageProps) {
  const [cards, setCards] = React.useState<any>([]);
  const [fromLocation, setFromLocation] = React.useState("");
  const [toLocation, setToLocation] = React.useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

    const onChangeFromInput = React.useCallback((evt) => {
        setFromLocation(evt.target.value);
    }, []);

  const onChangeToInput = React.useCallback((evt) => {
    setToLocation(evt.target.value);
  }, []);

  const onClickFilters = React.useCallback(() => {
    setIsOpenModal(!isOpenModal);
    if (!modalHandler) {
      return;
    }
    if (!isOpenModal) {
      modalHandler(Modals.SearchFilter);
    } else {
      modalHandler("");
    }
  }, []);

    React.useEffect(() => {
        customFetch(`${backendUrl}/api/ad/search?loc_dep=${fromLocation}&loc_arr=${toLocation}`)
            .then(({ data }) => {
                if (data === 'no data') {
                    setCards(mocks);
                    return;
                }
                setCards(data);
            })
            .catch((error) => {
                console.log(error);
                setCards(mocks);
            });
    }, []);

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
      <DeliveryAdsList cards={cards} />
    </BasePage>
  );
};
