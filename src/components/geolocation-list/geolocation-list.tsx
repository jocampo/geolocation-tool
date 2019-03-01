import * as React from 'react';
import { Typography } from '@material-ui/core';
import './geolocation-list.css';
import { GeoLocations } from '../../models/geolocation-models';

interface GeolocationListProps {
    locations: GeoLocations[];
}

class GeolocationList extends React.Component<GeolocationListProps> {

    public componentDidMount() {
        // get the most frequent locations
    }

    public render() {
        return (
            <>
                <Typography>
                    {JSON.stringify(this.props.locations)}
                </Typography>
            </>
        );
    }
}

export default GeolocationList;
