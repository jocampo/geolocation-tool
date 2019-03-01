import { AdSet, GeoLocations, Zip, Region } from '../models/geolocation-models';
import * as _ from 'underscore';
import { string } from 'prop-types';

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

/**
 * This function will group up the geolocations (regardless of subtype).
 * Then, it will count how frequent each geolocation is, and return the top 5 most frequent geolocations
 * @param geolocations Geolocation array
 */
export const groupGeoLocationsByType = (geolocations: GeoLocations[]): Map<any, number> => {
    const groupedLocations: any[] = [];

    geolocations.forEach((geoLocation: GeoLocations) => {
        if (geoLocation.cities && geoLocation.cities.length) {
            groupedLocations.push(...geoLocation.cities);
        }
        if (geoLocation.countries && geoLocation.countries.length) {
            groupedLocations.push(...geoLocation.countries);
        }
        if (geoLocation.geo_markets && geoLocation.geo_markets.length) {
            groupedLocations.push(...geoLocation.geo_markets);
        }
        if (geoLocation.regions && geoLocation.regions.length) {
            groupedLocations.push(...geoLocation.regions);
        }
        if (geoLocation.zips && geoLocation.zips.length) {
            groupedLocations.push(...geoLocation.zips);
        }
    });

    // We'll use JSON.stringify to set a key for each geoLocation.
    // Then we will be able to group them up and count them
    const geoLocationFrequency: Map<string, number> = new Map<string, number>();

    groupedLocations.forEach((location) => {
        const key = JSON.stringify(location);
        if (geoLocationFrequency.has(key)) {
            geoLocationFrequency.set(key, geoLocationFrequency.get(key)! + 1);
        } else {
            geoLocationFrequency.set(key, 1);
        }
    });

    // Contains the object keys for the 5 most popular geolocations (and their frequencies)
    const mostPopularGeolocations: Map<string, number> = new Map<string, number>();

    // Get the object keys with highest counts (sort the frequencies from highest to lowest)
    let sortedFrequencies = Array.from(geoLocationFrequency.values()).sort((a, b) => b - a);

    // We only care about the highest 5 frequencies
    sortedFrequencies = sortedFrequencies.slice(0, 5);

    // Look for these highest frequencies in our map
    sortedFrequencies.forEach((frequency) => {
        geoLocationFrequency.forEach((freq, objectKey) => {
            if (mostPopularGeolocations.size === 5) {
                return;
            }
            if (frequency === freq) {
                // Add the object key to our popular locations collection
                mostPopularGeolocations.set(objectKey, freq);
                // And then delete it from the grouped Locations (since the frequency might be repeated)
                geoLocationFrequency.delete(objectKey);
            }
        });
    });

    // Contains the actual object references to the top 5 most popular geolocations
    const parsedPopularGeolocations: Map<any, number> = new Map<any, number>();
    // We have the keys for the highest 5 elements, now we need to get them from their original collections
    Array.from(mostPopularGeolocations.keys()).forEach((objectKey) => {
        let geolocation: any = null;
        geolocation = groupedLocations.find((location) => {
            if (JSON.stringify(location) === objectKey) {
                return true;
            }
            return false;
        });
        if (geolocation) {
            parsedPopularGeolocations.set(geolocation, mostPopularGeolocations.get(objectKey)!);
        }
    });

    return parsedPopularGeolocations;
};
