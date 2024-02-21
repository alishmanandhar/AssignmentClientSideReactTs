import { Text } from "@chakra-ui/react"
import React from "react";

interface Props {
    subtitle: string
}

// use this component for sub-title for all pages
const SubTitle: React.FC<Props> = ({subtitle}) =>{
    return (
        <Text fontSize={'1rem'} mb={'0.5rem'} mt={'0.5rem'} fontWeight={'500'}>
            {subtitle}
        </Text>
    )
}

export default SubTitle;