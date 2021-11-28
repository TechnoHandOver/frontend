import { Avatar, Badge, Cell, Group, Title } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import React from 'react';
import { AdsIcon } from '../../images/ads/AdsIcon';
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
            <Cell before={<AdsIcon />} onClick={onClickMyAds}>
                Мои объявления
            </Cell>
        </BasePage>
    );
};

Profile.propTypes = {
    id: PropTypes.string.isRequired,
};
