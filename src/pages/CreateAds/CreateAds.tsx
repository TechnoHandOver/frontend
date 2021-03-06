import { Button, FixedLayout, FormItem, FormLayout, Group, Input, Textarea } from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import './CreateAds.css';
import { Ad, Api } from '../../api/Api';
import { getMasked } from '../../helpers/mask/mask';
import { BasePage } from '../BasePage/BasePage';

interface CreateAdsProps {
    id: string;
    navigationHandler: Dispatch<SetStateAction<string>>;
    active: string;
    setPopout: any;
    setActivePanel: Dispatch<SetStateAction<string>>;
    data?: Ad;
}

export const CreateAds: FC<CreateAdsProps> = ({ id, navigationHandler, active, setPopout, setActivePanel, data }) => {
    const [locationFrom, setLocationFrom] = useState(data?.locDep || '');
    const [locationTo, setLocationTo] = useState(data?.locArr || '');
    const [time, setTime] = useState(data?.dateTimeArr?.split(' ')[1] || '');
    const [subject, setSubject] = useState(data?.item || '');
    const [extra, setExtra] = useState(data?.comment || '');
    const [price, setPrice] = useState(data?.minPrice || '');

    const [error, setError] = useState(false);

    const handleChangeTime = (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement;
        const masked = getMasked(target.value);

        setTime(masked);
    };

    const handleChangePrice = (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement;

        if (Number.isNaN(Number(target.value))) {
            return;
        }

        setPrice(target.value);
    };

    const handleClick = () => {
        if (!locationFrom || !locationTo || !time || !subject || !price) {
            setError(true);
            return;
        }

        if (time.length !== 5) {
            setError(true);
            return;
        }

        setPopout(true);

        const now = new Date();
        const body = {
            locDep: locationFrom,
            locArr: locationTo,
            dateTimeArr: `${new Intl.DateTimeFormat('ru', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
                now,
            )} ${time}`,
            minPrice: Number(price),
            comment: extra,
            item: subject,
        };
        new Api().api
            .postApi(body)
            .then(({ ok }) => {
                setPopout(false);
                if (!ok) {
                    return;
                }

                setActivePanel('adsListPage');
            })
            .catch(() => {
                setPopout(false);
            });
    };

    return (
        <BasePage id={id} headerText="????????????????" active={active} navigationHandler={navigationHandler}>
            <Group>
                <FormLayout>
                    <FormItem
                        top="???????????? ??????????????????"
                        status={!locationFrom && error ? 'error' : undefined}
                        bottom={!locationFrom && error && '???????????????????????? ????????'}
                    >
                        <Input
                            placeholder="?????????????????? ???4"
                            value={locationFrom}
                            onChange={(evt) => {
                                setLocationFrom(evt.target.value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        top="???????? ??????????????????"
                        status={!locationTo && error ? 'error' : undefined}
                        bottom={!locationTo && error && '???????????????????????? ????????'}
                    >
                        <Input
                            placeholder="?????? ???????? ????. ??????????????"
                            value={locationTo}
                            onChange={(evt) => {
                                setLocationTo(evt.target.value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        top="?????????? ????????????????"
                        className="time"
                        status={(!time && error) || (time.length !== 5 && error) ? 'error' : undefined}
                        bottom={
                            !time && error ? '???????????????????????? ????????' : time.length !== 5 && error && '???????????????????????? ????????????'
                        }
                    >
                        <Input placeholder="14:20" value={time} onChange={handleChangeTime} />
                    </FormItem>
                    <FormItem
                        top="?????? ??????????????????"
                        status={!subject && error ? 'error' : undefined}
                        bottom={!subject && error && '???????????????????????? ????????'}
                    >
                        <Input
                            placeholder="??????????"
                            value={subject}
                            onChange={(evt) => {
                                setSubject(evt.target.value);
                            }}
                        />
                    </FormItem>
                    <FormItem top="????????????????">
                        <Textarea
                            placeholder="5 ??????????????, 8 ??????????. ?????????????????? ?????? ????????, ???????????????? ?????? ???????? ?? ?????? ??????????????."
                            value={extra}
                            onChange={(evt) => {
                                setExtra(evt.target.value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        top="???????????????????? ????????"
                        style={{ marginBottom: '50px' }}
                        status={!price && error ? 'error' : undefined}
                        bottom={!price && error && '???????????????????????? ????????'}
                    >
                        <Input placeholder="???? ??????????????" value={price} onChange={handleChangePrice} />
                    </FormItem>
                    <FixedLayout filled vertical="bottom" style={{ bottom: '50px' }}>
                        <FormItem>
                            <Button stretched size="l" onClick={handleClick}>
                                ??????????????
                            </Button>
                        </FormItem>
                    </FixedLayout>
                </FormLayout>
            </Group>
        </BasePage>
    );
};
