import {Div, Avatar, Card, Cell, Text} from "@vkontakte/vkui";
import { Icon28PaperplaneOutline } from '@vkontakte/icons';
import './DeliveryAd.css'
import * as React from "react";
import { Icon24ArrowDownOutline } from '@vkontakte/icons';
import {PaddedText} from "../../uiKit/PaddedText/PaddedText";
import { Icon16Minus } from '@vkontakte/icons';
import {parseTime} from "../../helpers/parseTime/parseTime";

const avatarSrc = 'https://sun9-22.userapi.com/impg/GqwjJuFIIMSYaSybujDI7PKayhtdjI8oFcABXA/BH3RAKOv2sY.jpg?size=720x1080&quality=96&sign=0863ce6a5aee8ef2122edc7053335535&type=album';

export const DeliveryAd = function DeliveryAd({locationFrom, locationTo, minPrice, timeFrom, timeTo, user}) {
    const timeDeparture = new Date(timeFrom);
    const timeDestination = new Date(timeTo);

    return (
        <Card>
            <div className='delivery-ad'>
                <div className='delivery-ad__travel'>
                    <PaddedText weight="semibold">{locationFrom}</PaddedText>
                    <div className='delivery-ad__icon'>
                        <Icon24ArrowDownOutline/>
                    </div>
                    <PaddedText weight="semibold">{locationTo}</PaddedText>
                </div>
                <PaddedText weight="semibold">{`${minPrice} руб.`}</PaddedText>
            </div>
            <div className='delivery-ad__time'>
                <Text weight="semibold" className='delivery-ad__time-from'>{`${parseTime(timeDeparture.getHours())}:${parseTime(timeDeparture.getMinutes())}`}</Text>
                <Icon16Minus className='delivery-ad__time-slash'/>
                <Text weight="semibold" className='delivery-ad__time-to'>{`${parseTime(timeDestination.getHours())}:${parseTime(timeDestination.getMinutes())}`}</Text>
            </div>
            <Cell
                className='delivery-ad__cell'
                before={<Avatar src={avatarSrc}/>}
            >
                Михаил Шевчук
            </Cell>
        </Card>
    )
}