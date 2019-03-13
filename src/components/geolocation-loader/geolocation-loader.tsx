import * as React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import './geolocation-loader.css';
import axios from 'axios';
import GeolocationList from '../geolocation-list/geolocation-list';
import { getGeolocationsFromAdSets } from '../../utils/utils';
import { GeoLocations, AdSetData } from '../../models/geolocation-models';

interface GeolocationLoaderState {
    locations: GeoLocations[];
    loading: boolean;
}

class GeolocationLoader extends React.Component<{}, GeolocationLoaderState> {

    private API_ENDPOINT = 'https://app.lolstream.com/services/v1/wordstream/interview_data';

    constructor(props: any) {
        super(props);
        this.state = {
            locations: [],
            loading: false
        };
    }

    public componentDidMount() {
        this.fetchGeolocationData();
    }

    public fetchGeolocationData = async () => {
        this.setState({
            loading: true
        });

        let adSets = null;
        try {
            adSets = await axios.get(this.API_ENDPOINT);
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log('Found an error processing the data fetch', JSON.stringify(e));
        }

        if (adSets && adSets.data) {
            const adSetData = adSets.data as AdSetData;
            if (adSetData.data) {
                // Set the fetched data in our state
                // For now, we only care about the geolocations
                this.setState({
                    locations: getGeolocationsFromAdSets(adSetData.data)
                });
            }
        }

        this.setState({
            loading: false,
        });

        return;
    }

    public render() {
        const fetchingData = (
            <div className={'loader-container'}>
                <Typography variant={'h3'}>
                    Loading geolocation data
                </Typography>
                <CircularProgress />
            </div>
        );

        return (
            <>
                <Button disabled={this.state.loading} className={'fetch-button'} onClick={this.fetchGeolocationData} variant={'contained'}>
                    <Typography variant={'button'} color={'primary'}>
                        Fetch Data
                    </Typography>
                </Button>
                {this.state.loading ? fetchingData : <GeolocationList locations={this.state.locations} />}
            </>
        );
    }
}

export default GeolocationLoader;
