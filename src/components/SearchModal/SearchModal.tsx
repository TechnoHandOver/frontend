import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
} from "@vkontakte/vkui";

export const SearchModal = () => {
  return (
    <ModalPage
      id="searchFilters"
      onClose={() => {}}
      header={
        <ModalPageHeader
          left={<PanelHeaderClose />}
          right={<PanelHeaderSubmit />}
        >
          Фильтры
        </ModalPageHeader>
      }
    />
  );
};
