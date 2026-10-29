import React from 'react';

export interface StickyPanel {
  id: string;
  name: string;
  channelId: string;
  title: string;
  content: string;
  enabled: boolean;
  embed: boolean;
  color: string;
  imageUrl: string;
  footer: string;
}

export default function StickyPanelsTab(props: any) {
  return <div>StickyPanelsTab</div>;
}
