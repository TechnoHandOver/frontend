import {DeliveryAdsList} from "../../components/DeliveryAdsList/DeliveryAdsList";
import {BasePage} from "../BasePage/BasePage";


export const AdsListPage = function AdsListPage({id, navigationHandler, active}) {
    return (
        <BasePage id={id} headerText='Объявления' active={active} navigationHandler={navigationHandler}>
            <DeliveryAdsList/>
        </BasePage>
    )
}