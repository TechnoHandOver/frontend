import { Avatar, Cell, Group, Title } from "@vkontakte/vkui";
import React, { FC } from "react";

export interface ProfileBlock {
    id?: number;
    first_name?: string;
    last_name?: string;
    city?: {
        id: number;
        title: string;
    };
    photo_200?: string;

    redirect?: boolean;
}

export const ProfileBlock: FC<ProfileBlock> = ({ id, first_name, last_name, city, photo_200, redirect }) => {
    const handleClickProfile = () => {
        if (!redirect) {
            return;
        }

        if (window.top) {
            console.log('я в топе')
            window.top.location.href = `https://vk.com/id${id}`;
        }
    };

    return (
        <Group onClick={handleClickProfile}>
            <Cell
                before={photo_200 ? <Avatar src={photo_200} size={72} /> : null}
                description={city && city.title ? city.title : ''}
            >
                <Title level="1" weight="regular">{`${first_name} ${last_name}`}</Title>
            </Cell>
        </Group>
    );
};