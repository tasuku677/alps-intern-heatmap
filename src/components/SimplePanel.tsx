import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { KonvaComponent } from './KonvaComponent';


interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  console.log('Data', data);
  
  const versions = JSON.parse(data.series[0].fields.find((field) => field.name === 'versions')?.values[0])[0];
  // const points = data.series[0].fields.find((field) => field.name === 'points')?.values[0];
  const assetId = data.series[0].fields.find((field) => field.name === 'media_asset_id')?.values[0];
  const url = options.url + `/${assetId}`;

  // console.log('Data', data.series[0].fields[1].values[0]);

  const pointsData = JSON.parse(data.series[0].fields[1].values[0])[versions];
  console.log('pointsData', pointsData);
  console.log('type of pointsData', typeof(pointsData));
  return (
    <div style={{ width, height }}>
      <KonvaComponent
        data={pointsData}
        // versions={versionsData}
        width={width}
        height={height}
        imageUrl={url}
      />
    </div>
  );
};
