import {Div, Text} from "@vkontakte/vkui";


export const PaddedText = function PaddedText({children, weight, className}) {
    return (
        <Div>
            <Text weight={weight} className={className || ''}>
                {children}
            </Text>
        </Div>
    )
}