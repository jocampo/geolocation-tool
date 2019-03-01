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
        this.setState({
            popularLocations: groupGeoLocationsByType(this.props.locations)
        });
    }

    private renderLocationData = (): JSX.Element[] => {
        const locationData: JSX.Element[] = [];

        this.state.popularLocations.forEach((frequency, geolocation) => {
            locationData.push(
                <div className={'result'} key={JSON.stringify(geolocation)}>
                    <Typography variant={'h5'}>
                        The geolocation {JSON.stringify(geolocation)} was found {frequency} times!
                    </Typography>
                </div>
            );
        });

        return locationData;
    }

    public render() {

        return (
            <div className={'results'}>
                <Typography variant={'h4'}>
                    These are the most frequent locations from the data we fetched:
                </Typography>
                {this.renderLocationData()}
            </div>
        );
    }
}

export default GeolocationList;
