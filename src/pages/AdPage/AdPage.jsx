import React, { useEffect } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderButton,
    Title,
    Div,
    FormLayoutGroup,
    FormItem,
    Text,
    Input,
    FixedLayout,
    Button,
} from '@vkontakte/vkui';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { parseTime } from '../../helpers/parseTime/parseTime';

export const AdPage = ({ data, setActiveView }) => {
    const handleClick = () => {
        window.location.href = `//vk.com/id${data.userAuthorVkId}`;
    };

    return (
        <Panel>
            <PanelHeader
                left={
                    <PanelHeaderButton>
                        <Icon28ChevronLeftOutline
                            onClick={() => {
                                setActiveView('main');
                            }}
                        />
                    </PanelHeaderButton>
                }
            >
                Объявление
            </PanelHeader>
            <FormItem top="Откуда" className="delivery-ad__form-item">
                <Title level="3" weight="regular">
                    {data.locDep}
                </Title>
            </FormItem>
            <FormItem top="Куда" className="delivery-ad__form-item">
                <Title level="3" weight="regular">
                    {data.locArr}
                </Title>
            </FormItem>
            <FormLayoutGroup mode="horizontal" className="delivery-ad__form-item">
                <FormItem top="Время доставки:">
                    <Title weight="regular" level="3">
                        {data && data.dateTimeArr.split(' ')[1]}
                    </Title>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Что нужно перевезти?" className="delivery-ad__form-item">
                <Title weight="regular" level="3">
                    {data.item}
                </Title>
            </FormItem>
            {data.comment && (
                <FormItem top="Комментарий" className="delivery-ad__form-item">
                    <Title weight="regular" level="3">
                        {data.comment}
                    </Title>
                </FormItem>
            )}
            <FormItem top="Цена">
                <Title level="1" weight="semibold" style={{ color: '#2363AD' }}>
                    {data.minPrice} &#8381;
                </Title>
            </FormItem>
            <FixedLayout filled vertical="bottom" style={{ bottom: '50px' }}>
                <FormItem>
                    <Button stretched size="l" onClick={handleClick}>
                        Откликнуться
                    </Button>
                </FormItem>
            </FixedLayout>
        </Panel>
    );
};
