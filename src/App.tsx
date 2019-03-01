import * as React from 'react';
import './App.css';
import GeolocationLoader from './components/geolocation-loader/geolocation-loader';
import { createMuiTheme, MuiThemeProvider, Typography } from '@material-ui/core';

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={createMuiTheme()}>
                <div className={'body'}>
                    <header className={'body'}>
                        <Typography variant={'h4'}>
                            AdSets - Popular Geolocations
                        </Typography>
                    </header>
                    <article>
                        <GeolocationLoader />
                    </article>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
