import { greatCircle } from '@turf/great-circle';
import { Layer, Source } from 'react-map-gl/mapbox';

import { MapScheduleLocationFragment } from '@/types/graphql';

export const ConnectionLine = ({
  active,
  event,
  adjacentEvent,
  color,
}: {
  active: boolean;
  event: MapScheduleLocationFragment;
  color: string;
  adjacentEvent?: MapScheduleLocationFragment;
}) => {
  const lineCoordinates = adjacentEvent
    ? greatCircle(
        [event?.longitude as number, event?.latitude as number],
        [adjacentEvent?.longitude as number, adjacentEvent?.latitude as number],
      ).geometry.coordinates
    : [];

  const coordinates =
    lineCoordinates.length === 2
      ? (lineCoordinates as GeoJSON.Position[][])
      : [lineCoordinates as GeoJSON.Position[]];

  return (
    <Source
      id={adjacentEvent?.event_name || event.location || ''}
      type='geojson'
      data={{
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: coordinates,
        },
        properties: {},
      }}
    >
      <Layer
        id={adjacentEvent?.event_name || 'line'}
        type='line'
        source={adjacentEvent?.event_name || 'line-source'}
        paint={{
          'line-opacity': active ? 1 : 0,
          'line-color': color,
          'line-width': 2,
        }}
      />
    </Source>
  );
};
