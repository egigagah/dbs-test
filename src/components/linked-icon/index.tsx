import { As, Icon } from "@chakra-ui/react";
import { AreaHTMLAttributes, CSSProperties } from "react";

type LinkedIconProps = AreaHTMLAttributes<any> & {
    icon: As<any>;
};

export function LinkedIcon({ icon, ...rest }: LinkedIconProps) {
    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
    };
    return (
        <a style={iconStyle} {...rest} data-testid="linked-icon">
            <Icon as={icon} color="white" boxSize={8} />
        </a>
    );
}
