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
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import './AdPage.css';
import { Ad, Api, InlineResponse2012 } from "../../api/Api";
import { ProfileBlock } from "../../components/ProfileBlock/ProfileBlock";

interface AdPageProps {
    id: string;
    data: Ad;
    setActivePanel: Dispatch<SetStateAction<string>>;
    userId: number | undefined;
    setCreateAd: any;
}

export const AdPage: FC<AdPageProps> = ({ id, data, setActivePanel, userId, setCreateAd }) => {
    const [ad, setAd] = useState<Ad | undefined>(data);

    const linkRef = React.useRef<HTMLAnchorElement>(null);

    const handleChangeAd = () => {
        setCreateAd(data);
        setActivePanel('change-ad');
    };

    const handleDeleteAd = () => {
        new Api().api.deleteApi(ad?.id || -1)
            .then(() => {
                setActivePanel('myAds');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRespondAd = async () => {
        const response = await fetch(`https://handover.space/bot/respond?author_id=${data.userAuthorVkId}&executor_id=${userId}`);
        if (linkRef.current) {
            linkRef.current.href = `https://vk.com/id${data.userAuthorVkId}`;
            linkRef.current.click();
        }

        if (!response.ok) {
            console.log(`error: ${response}`);
        }
    };

    useEffect(() => {
        new Api().api.getApi(data?.id || -1)
            .then(async (response) => {
                const {data}: InlineResponse2012 = await response.json();
                setAd(data);
            })
            .catch(() => null);
    }, [data?.id]);

    console.log('рисую письки');

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
                    {ad?.locDep}
                </Title>
            </FormItem>
            <FormItem top="Куда" className="delivery-ad__form-item">
                <Title level="3" weight="regular">
                    {ad?.locArr}
                </Title>
            </FormItem>
            <FormLayoutGroup mode="horizontal" className="delivery-ad__form-item">
                <FormItem top="Время доставки:">
                    <Title weight="regular" level="3">
                        {ad?.dateTimeArr && ad.dateTimeArr.split(' ')[1]}
                    </Title>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Что нужно перевезти?" className="delivery-ad__form-item">
                <Title weight="regular" level="3">
                    {ad?.item}
                </Title>
            </FormItem>
            {data.comment && (
                <FormItem top="Комментарий" className="delivery-ad__form-item">
                    <Title weight="regular" level="3">
                        {ad?.comment}
                    </Title>
                </FormItem>
            )}
            <FormItem top="Цена">
                <Title level="1" weight="semibold" style={{ color: '#2363AD' }}>
                    {ad?.minPrice} &#8381;
                </Title>
            </FormItem>
            <FixedLayout filled vertical="bottom" style={{ bottom: '10px' }}>
                {ad?.userAuthorVkId !== userId ? (
                    <>
                        <ProfileBlock
                            id={ad?.userAuthorVkId}
                            first_name={ad?.userAuthorName?.split(' ')[0]}
                            last_name={ad?.userAuthorName?.split(' ')[1]}
                            photo_200={ad?.userAuthorAvatar}
                            redirect
                        />
                        <FormItem>
                            <a className="link" ref={linkRef}>
                                <Button stretched size="l" onClick={handleRespondAd}>
                                    Откликнуться
                                </Button>
                            </a>
                        </FormItem>
                    </>
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
