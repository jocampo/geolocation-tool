import * as React from 'react';
import { Typography } from '@material-ui/core';
import './geolocation-list.css';
import { GeoLocations } from '../../models/geolocation-models';
import { groupGeoLocationsByType } from '../../utils/utils';

interface GeolocationListProps {
    locations: GeoLocations[];
}

interface GeolocationListState {
    popularLocations: Map<any, number>;
}

class GeolocationList extends React.Component<GeolocationListProps, GeolocationListState> {

    constructor(props: GeolocationListProps) {
        super(props);
        this.state = {
            popularLocations: new Map<any, number>()
        };
    }

    public componentDidMount() {
        // get the most frequent locations
        this.setState({
            popularLocations: groupGeoLocationsByType(this.props.locations)
        });
    }

    private renderLocationData = (): JSX.Element[] => {
        const locationData: JSX.Element[] = [];

        this.state.popularLocations.forEach((frequency, geolocation) => {
            locationData.push(
                <div>
                    The location {JSON.stringify(geolocation)} was found {frequency} times!
                </div>
            );
        });

        return locationData;
    }

    public render() {

        return (
            <>
                <Typography>
                    These are the top most frequent locations
                </Typography>
                {this.renderLocationData()}
            </>
        );
    }
}

export default GeolocationList;
