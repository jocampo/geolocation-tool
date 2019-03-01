import { groupGeoLocationsByType } from '../utils/utils';
import { GeoLocations, City } from '../models/geolocation-models';

/* tslint:disable */

const testGeolocations = [{
    cities: [{ name: 'Boston', country: 'US', region: 'Massachussetts' } as City,
            { name: 'Cambridge', country: 'US', region: 'Massachussetts' } as City]
    } as GeoLocations, {
        cities: [{ name: 'Boston', country: 'US', region: 'Massachussetts' } as City,
                { name: 'Cambridge', country: 'US', region: 'Massachussetts' } as City]
    } as GeoLocations, {
        cities: [{ name: 'Boston', country: 'US', region: 'Massachussetts' } as City]
    } as GeoLocations, {
        countries: ['US', 'UK', 'SP', 'MX', 'US']
    } as GeoLocations, {
        countries: ['US', 'US', 'US', 'US']
    } as GeoLocations, {
        countries: ['MX', 'MX', 'MX', 'MX']
    } as GeoLocations,
];

it('returns the top 5 most popular geolocations', () => {
    const result = groupGeoLocationsByType(testGeolocations);
    // We're returning only the 5 most popular locations
    expect(result.size).toBe(5);
    // 6 occurrences of US, 5 of MX (countries), 3 of Boston, 2 of Cambridge (Cities)
    // 1 for UK (country)
    expect(Array.from(result.values())).toEqual([6, 5, 3, 2, 1]);
    expect(Array.from(result.keys())).toEqual([
        'US',
        'MX',
        { name: 'Boston', country: 'US', region: 'Massachussetts' },
        { name: 'Cambridge', country: 'US', region: 'Massachussetts' },
        'UK']);
});
