import {Div, Text} from "@vkontakte/vkui";


export const PaddedText = function PaddedText({children, weight, className, divClassName}) {
    return (
        <Div className={divClassName}>
            <Text weight={weight} className={className || ''}>
                {children}
            </Text>
        </Div>
    )
}