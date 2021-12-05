import { Icon24CalendarOutline, Icon20CheckNewsfeedOutline } from '@vkontakte/icons';
import { Avatar, Cell, Group, Title } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import React from 'react';
import { BasePage } from '../BasePage/BasePage';

export const Profile = ({ id, user, active, navigationHandler, onClickMyAds }) => {
    return (
        <BasePage id={id} active={active} headerText="Профиль" navigationHandler={navigationHandler}>
            {user && (
                <Group>
                    <Cell
                        before={user.photo_200 ? <Avatar src={user.photo_200} size={72} /> : null}
                        description={user.city && user.city.title ? user.city.title : ''}
                    >
                        <Title level="1" weight="regular">{`${user.first_name} ${user.last_name}`}</Title>
                    </Cell>
                </Group>
            )}
            <Cell before={<Icon20CheckNewsfeedOutline fill="#99A2AD" height={35} width={35} />} onClick={onClickMyAds}>
                Мои объявления
            </Cell>
            <Cell before={<Icon24CalendarOutline fill="#99A2AD" width={35} height={35} />}>Моё расписание</Cell>
        </BasePage>
    );
};

Profile.propTypes = {
    id: PropTypes.string.isRequired,
};
