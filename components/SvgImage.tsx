import React from 'react';
import { SvgUri } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type SvgImageProps = {
    uri: string;
    style?: StyleProp<ViewStyle>;
    fill?: string;
};

export default function SvgImage({ uri, style, fill }: SvgImageProps) {
    return (
        <SvgUri
            width="100%"
            height="100%"
            uri={uri}
            style={style}
            fill={fill}
        />
    );
} 