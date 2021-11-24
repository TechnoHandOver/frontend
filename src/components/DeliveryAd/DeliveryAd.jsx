import { Avatar, Card, Cell, Div, FormItem, FormLayoutGroup, Input, Text } from '@vkontakte/vkui';
import './DeliveryAd.css';
import * as React from 'react';
import { Icon16Minus } from '@vkontakte/icons';
import { PaddedText } from '../../uiKit/PaddedText/PaddedText';
import { parseTime } from '../../helpers/parseTime/parseTime';
import { Arrow } from '../../images/arrow/Arrow';

const avatarSrc =
    'https://sun9-22.userapi.com/impg/GqwjJuFIIMSYaSybujDI7PKayhtdjI8oFcABXA/BH3RAKOv2sY.jpg?size=720x1080&quality=96&sign=0863ce6a5aee8ef2122edc7053335535&type=album';
const defaultIconSize = 20;

export const DeliveryAd = function DeliveryAd({
    locDep,
    locArr,
    minPrice,
    dateTimeArr,
    item,
    comment,
    userAuthorVkId,
    setActivePanel,
    setAdData,
}) {
    // const timeDeparture = new Date(dateTimeArr);
    const [commentIsOpen, setCommentIsOpen] = React.useState(false);

    const handleClickExpandable = React.useCallback(() => {
        setCommentIsOpen(!commentIsOpen);
    }, [commentIsOpen]);

    const handleClickCard = () => {
        setActivePanel('one-ad');
        setAdData({ locDep, locArr, minPrice, dateTimeArr, item, comment });
    };

    return (
        <Card mode="shadow" onClick={handleClickCard}>
            <FormItem>
                <div className="delivery-ad__travel">
                    <Text weight="medium" className="delivery-ad__text">
                        {locDep}
                    </Text>
                    <div className="delivery-ad__icon">
                        <Arrow />
                    </div>
                    <Text weight="medium" className="delivery-ad__text">
                        {locArr}
                    </Text>
                </div>
            </FormItem>
            <FormLayoutGroup mode="horizontal" className="delivery-ad__form-item">
                <FormItem top="Время доставки:">
                    <Text weight="semibold">{dateTimeArr.split(' ')[1]}</Text>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Что нужно перевезти?" className="delivery-ad__form-item">
                <Input value={item} disabled />
            </FormItem>
            <FormItem top="Цена">
                <Text weight="semibold" className="delivery-ad__price">
                    {minPrice} руб.
                </Text>
            </FormItem>
            <FormItem top="Раскрыть ещё" onClick={handleClickExpandable}>
                {commentIsOpen && <Text weight="regular">{comment}</Text>}
            </FormItem>
        </Card>
    );
};
