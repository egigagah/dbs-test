import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Footer, Header } from "..";

type LayoutProps = {
    withHeader?: boolean;
    withFooter?: boolean;
};

export default function Layout({
    withHeader = true,
    withFooter = true,
    children,
}: PropsWithChildren<LayoutProps>) {
    return (
        <Flex direction="column" minH="100vh" data-testid="layout">
            {withHeader && <Header />}
            {children}
            {withFooter && <Footer />}
        </Flex>
    );
}
