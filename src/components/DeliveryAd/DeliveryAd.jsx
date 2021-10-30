import {Avatar, Card, Cell, Div, FormItem, FormLayoutGroup, Input, Text} from "@vkontakte/vkui";
import './DeliveryAd.css'
import * as React from "react";
import {Icon16Minus} from '@vkontakte/icons';
import {PaddedText} from "../../uiKit/PaddedText/PaddedText";
import {parseTime} from "../../helpers/parseTime/parseTime";
import {Arrow} from "../../images/arrow/Arrow";

const avatarSrc = 'https://sun9-22.userapi.com/impg/GqwjJuFIIMSYaSybujDI7PKayhtdjI8oFcABXA/BH3RAKOv2sY.jpg?size=720x1080&quality=96&sign=0863ce6a5aee8ef2122edc7053335535&type=album';
const defaultIconSize = 20;

export const DeliveryAd = function DeliveryAd({locationFrom, locationTo, minPrice, timeFrom, timeTo, user}) {
    const timeDeparture = new Date(timeFrom);
    const timeDestination = new Date(timeTo);

    return (
        <Card mode="shadow">
            <FormItem>
                <div className='delivery-ad__travel'>
                    <Text weight="medium" className='delivery-ad__text'>{locationFrom}</Text>
                    <div className='delivery-ad__icon'>
                        <Arrow/>
                    </div>
                    <Text weight="medium" className='delivery-ad__text'>{locationTo}</Text>
                </div>
            </FormItem>
            <FormItem top='Дата выезда' className='delivery-ad__form-item'>
                <Text weight='medium'>25.10.2021</Text>
            </FormItem>
            <FormLayoutGroup mode='horizontal' className='delivery-ad__form-item'>
                <FormItem top='Время выезда:'>
                    <Text weight="semibold">{`${parseTime(timeDeparture.getHours())}:${parseTime(timeDeparture.getMinutes())}`}</Text>
                </FormItem>
                <FormItem top='Время прибытия:'>
                    <Text weight="semibold">{`${parseTime(timeDestination.getHours())}:${parseTime(timeDestination.getMinutes())}`}</Text>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top='Что нужо перевезти?' className='delivery-ad__form-item'>
                <Input value='тубус' disabled/>
            </FormItem>
            <FormItem top='Цена'>
                <Text weight='semibold' className='delivery-ad__price'>500 руб.</Text>
            </FormItem>
        </Card>
    )
}