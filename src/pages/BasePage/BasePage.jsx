import { Panel, PanelHeader } from "@vkontakte/vkui";
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel";

export const BasePage = function BasePage({
  id,
  headerText,
  active,
  header,
  navigationHandler,
  children,
}) {
  return (
    <Panel id={id}>
      {header ? header : <PanelHeader>{headerText}</PanelHeader>}
      <div style={{ paddingBottom: 60, paddingTop: header ? 120 : 0 }}>
        {children}
      </div>
      <NavigationPanel active={active} navigationHandler={navigationHandler} />
    </Panel>
  );
};
