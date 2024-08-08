import { Input } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';
import React from 'react';

interface Settings {
    url: string,
}

type Props = StandardEditorProps<string, Settings>;


export const UrlEditor = ({ item, value, onChange }: Props) => {
    return <Input value={value} onChange={(e) => onChange(e.currentTarget.value)} />;
};
