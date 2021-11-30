import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import {
    Panel,
    PanelHeader,
    PanelHeaderButton,
    Title,
    FormLayoutGroup,
    FormItem,
    FixedLayout,
    Button,
} from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction } from "react";
import './AdPage.css';
import { Ad, Api } from "../../api/Api";

interface AdPageProps {
    id: string;
    data: Ad;
    setActivePanel: Dispatch<SetStateAction<string>>;
    userId: number | undefined;
    setCreateAd: any;
}

export const AdPage: FC<AdPageProps> = ({ id, data, setActivePanel, userId, setCreateAd }) => {
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    // React.useEffect(() => {
    //     if (linkRef.current) {
    //         linkRef.current.href = `https://vk.com/id${data.userAuthorVkId}`;
    //     }
    // }, [data.userAuthorVkId]);

    const handleChangeAd = () => {
        setCreateAd(data);
        setActivePanel('change-ad');
    };

    const handleDeleteAd = () => {
        new Api().api.deleteApi(data?.id || -1)
            .then(() => {
                setActivePanel('myAds');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRespondAd = async () => {
        const response = await fetch(`https://handover.space/bot/execute?author_id=${data.userAuthorVkId}&executor_id=${userId}`);
        if (linkRef.current) {
            linkRef.current.href = `https://vk.com/id${data.userAuthorVkId}`;
        }

        if (!response.ok) {
            console.log(`error: ${response}`);
        }
    };

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
                        {data.dateTimeArr && data.dateTimeArr.split(' ')[1]}
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
            <FixedLayout filled vertical="bottom" style={{ bottom: '10px' }}>
                {data.userAuthorVkId !== userId ? (
                    <FormItem>
                        <a className="link" ref={linkRef}>
                            <Button stretched size="l" onClick={handleRespondAd}>
                                Откликнуться
                            </Button>
                        </a>
                    </FormItem>
                ) : (
                    <>
                        <FormItem>
                            <Button stretched size="l" onClick={handleChangeAd}>
                                Изменить
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button stretched size="l" mode="destructive" onClick={handleDeleteAd}>
                                Удалить
                            </Button>
                        </FormItem>
                    </>
                )}
            </FixedLayout>
        </Panel>
    );
};
