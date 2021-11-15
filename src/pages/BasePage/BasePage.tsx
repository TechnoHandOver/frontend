import { Panel, PanelHeader } from "@vkontakte/vkui";
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface BasePageProps {
  id: string;
  active: string;
  navigationHandler: Dispatch<SetStateAction<string>>;
  headerText?: string;
  header?: ReactNode;
  children: ReactNode;
}

export const BasePage: FC<BasePageProps> = function BasePage({
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
      <div style={{ paddingBottom: 70, paddingTop: header ? 130 : 0 }}>
        {children}
      </div>
      <NavigationPanel active={active} navigationHandler={navigationHandler} />
    </Panel>
  );
};
