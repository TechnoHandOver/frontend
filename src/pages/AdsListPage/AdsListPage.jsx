import {Panel, PanelHeader, View} from "@vkontakte/vkui";
import {DeliveryAdsList} from "../../components/DeliveryAdsList/DeliveryAdsList";


export const AdsListPage = function AdsListPage() {
    return (
        <View activePanel="adsListPage">
            <Panel id='adsListPage'>
                <PanelHeader>Объявления</PanelHeader>
                <DeliveryAdsList/>
            </Panel>
        </View>
    );
}