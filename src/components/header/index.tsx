import React from "react";
import { Flex } from "@chakra-ui/react";

import { Logo } from "@components";

export const Header: React.FC = () => {
    return (
        <Flex
            bg="header.100"
            data-testid="header"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            px={[4, 6, 8, 12]}
            py={2}
        >
            <Logo />
        </Flex>
    );
};
