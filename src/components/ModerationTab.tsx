import React from 'react';

export interface ModerationSettings {
  enabled: boolean;
  [key: string]: any;
}

export const defaultModerationSettings: ModerationSettings = {
  enabled: true
};

export default function ModerationTab(props: any) {
  return <div>ModerationTab</div>;
}
