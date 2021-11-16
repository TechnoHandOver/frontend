import React from 'react';
import PropTypes from 'prop-types';
import { BasePage } from '../BasePage/BasePage';
import { Avatar, Cell, Group, Title } from '@vkontakte/vkui';

export const Profile = ({ id, user, active, navigationHandler }) => {
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
        </BasePage>
    );
};

Profile.propTypes = {
    id: PropTypes.string.isRequired,
};
