import { Panel, PanelHeader} from "@vkontakte/vkui";
import {NavigationPanel} from "../../components/NavigationPanel/NavigationPanel";


export const BasePage = function BasePage({id, headerText, active, navigationHandler, children}) {
    return (
        <Panel id={id}>
            <PanelHeader>{headerText}</PanelHeader>
            <div style={{ paddingBottom: 60 }}>
                {children}
            </div>
            <NavigationPanel active={active} navigationHandler={navigationHandler}/>
        </Panel>
    )
}