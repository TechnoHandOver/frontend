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

import './AdPage.css';

export const AdPage = ({ id, data, setActivePanel }) => {
    const linkRef = React.useRef(null);

    const handleClick = () => {
        // window.location.href = `//vk.com/id${data.userAuthorVkId}`;
        console.log(data.userAuthorVkId);
    };

    React.useEffect(() => {
        linkRef.current.href = `https://vk.com/id${data.userAuthorVkId}`;
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader
                left={
                    <PanelHeaderButton>
                        <Icon28ChevronLeftOutline
                            onClick={() => {
                                setActivePanel('adsListPage');
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
                    <a className="link" ref={linkRef}>
                        <Button stretched size="l" onClick={handleClick}>
                            Откликнуться
                        </Button>
                    </a>
                </FormItem>
            </FixedLayout>
        </Panel>
    );
};
