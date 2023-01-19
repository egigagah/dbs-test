import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export const Logo: React.FC = () => {
    return (
        <NextLink href="/" passHref>
            <Link>
                <Image
                    src="/icons/nextjs-icon.svg"
                    alt="nextjs"
                    width="60"
                    height="32"
                    objectFit="fill"
                />
            </Link>
        </NextLink>
    );
};
