import { AdSet, GeoLocations } from '../models/geolocation-models';

export const getGeolocationsFromAdSets = (adSets: AdSet[]): GeoLocations[] => {
    if (!adSets || !Array.isArray(adSets)) {
        return [];
    }

    const geoLocations: GeoLocations[] = [];

    adSets.forEach((adSet: AdSet) => {
        if (adSet && adSet.targeting && adSet.targeting.geo_locations) {
            geoLocations.push(Object.assign({}, adSet.targeting.geo_locations));
        }
    });

    return geoLocations;
};