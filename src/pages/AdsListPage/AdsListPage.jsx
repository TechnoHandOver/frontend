import React from "react";
import { DeliveryAdsList } from "../../components/DeliveryAdsList/DeliveryAdsList";
import { BasePage } from "../BasePage/BasePage";
import { SearchPanel } from "../../components/SearchPanel/SearchPanel";
import { SettingsIcon } from "../../images/settings/SettingsIcon";
import "./AdsListPage.css";
import { FixedLayout, FormItem, Separator, Spacing } from "@vkontakte/vkui";
import { customFetch } from "../../helpers/customFetch/customFetch";

const mocks = [
  {
    locationFrom: "Общежитие №4 Измайлово",
    locationTo: "ГЗ МГТУ им Н.Э. Баумана",
    minPrice: "500",
    timeFrom: "2021-10-02T12:00:00.000Z",
    timeTo: "2021-10-02T12:20:00.000Z",
  },
  {
    locationFrom: "Общежитие №4 Мытищи",
    locationTo: "УЛК",
    minPrice: "350",
    timeFrom: "2021-10-02T12:00:00.000Z",
    timeTo: "2021-10-02T12:20:00.000Z",
  },
  {
    locationFrom: "Общежитие №4 Мытищи",
    locationTo: "ГЗ МГТУ им Н.Э. Баумана",
    minPrice: "370",
    timeFrom: "2021-10-02T12:00:00.000Z",
    timeTo: "2021-10-02T12:20:00.000Z",
  },
  {
    locationFrom: "Общежитие №10 (СМ)",
    locationTo: "ГЗ МГТУ им Н.Э. Баумана",
    minPrice: "370",
    timeFrom: "2021-10-02T12:00:00.000Z",
    timeTo: "2021-10-02T12:20:00.000Z",
  },
];

const backendUrl = "https://handover.space";

export const AdsListPage = function AdsListPage({
  id,
  navigationHandler,
  active,
}) {
  const [cards, setCards] = React.useState([]);
  const [fromLocation, setFromLocation] = React.useState("");
  const [toLocation, setToLocation] = React.useState("");

  const onChangeFromInput = React.useCallback((evt) => {
    setFromLocation(evt.target.value);
  }, []);

  const onChangeToInput = React.useCallback((evt) => {
    setToLocation(evt.target.value);
  }, []);

  React.useEffect(() => {
    customFetch(
      `${backendUrl}/api/ad/search?loc_dep=${fromLocation}&loc_arr=${toLocation}`
    )
      .then(({ data }) => {
        if (data === "no data") {
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
