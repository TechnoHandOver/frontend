import { DeliveryAdsList } from "../../components/DeliveryAdsList/DeliveryAdsList";
import { BasePage } from "../BasePage/BasePage";
import { SearchPanel } from "../../components/SearchPanel/SearchPanel";
import { SettingsIcon } from "../../images/settings/SettingsIcon";
import "./AdsListPage.css";
import { FixedLayout, FormItem, Separator, Spacing } from "@vkontakte/vkui";

export const AdsListPage = function AdsListPage({
  id,
  navigationHandler,
  active,
}) {
  return (
    <BasePage
      id={id}
      header={
        <FixedLayout filled vertical="top">
          <SearchPanel />
        </FixedLayout>
      }
      active={active}
      navigationHandler={navigationHandler}
    >
      <DeliveryAdsList />
    </BasePage>
  );
};
