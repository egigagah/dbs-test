import React from "react";
import { Flex, Center, Text } from "@chakra-ui/react";
import {
    RiGithubFill,
    RiTwitterFill,
    RiLinkedinFill,
    RiGlobalFill,
    RiNpmjsFill,
} from "react-icons/ri";
import { LinkedIcon } from "..";

export const Footer: React.FC = () => {
    return (
        <Center bg="main.100" py={10}>
            <Flex flexDirection="column">
                <a
                    href="https://github.com/egigagah"
                    target="_blank"
                    data-testid="copyright"
                >
                    <Text mb="0" fontSize="xl" color="white" fontWeight="bold">
                        Egi Gagah Brilliant &copy; 2023
                    </Text>
                </a>
                <Flex
                    mt={5}
                    data-testid="icons-container"
                    justifyContent="center"
                    gap="4"
                >
                    <LinkedIcon
                        icon={RiGithubFill}
                        href="https://github.com/egigagah"
                        target="_blank"
                    />
                    <LinkedIcon
                        icon={RiTwitterFill}
                        href="https://twitter.com/egggii"
                        target="_blank"
                    />
                    <LinkedIcon
                        icon={RiGlobalFill}
                        href="https://egigagah.vercel.app/"
                        target="_blank"
                    />
                    <LinkedIcon
                        icon={RiLinkedinFill}
                        href="https://www.linkedin.com/in/egi-gagah-brilliant-b0b940132/"
                        target="_blank"
                    />
                    <LinkedIcon
                        icon={RiNpmjsFill}
                        href="https://www.npmjs.com/package/react-ide-component"
                        target="_blank"
                    />
                </Flex>
            </Flex>
        </Center>
    );
};
