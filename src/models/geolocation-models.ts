export interface Interest {
    id: string;
    name: string;
}

export interface WorkEmployer {
    id: string;
    name: string;
}

export interface LifeEvent {
    id: string;
    name: string;
}

export interface Behavior {
    id: string;
    name: string;
}

export interface CustomAudience {
    id: string;
    name: string;
}

export interface FlexibleSpec {
    interests: Interest[];
    work_employers: WorkEmployer[];
    life_events: LifeEvent[];
    behaviors: Behavior[];
    custom_audiences: CustomAudience[];
}

export interface Region {
    country: string;
    name: string;
    key: string;
}

export interface Zip {
    country: string;
    primary_city_id: number;
    name: string;
    key: string;
    region_id: number;
}

export interface City {
    name: string;
    country: string;
    region: string;
    distance_unit: string;
    key: string;
    region_id: string;
    radius?: number;
}

export interface GeoMarket {
    country: string;
    name: string;
    key: string;
}

export interface GeoLocations {
    regions: Region[];
    location_types: string[];
    zips: Zip[];
    cities: City[];
    countries: string[];
    geo_markets: GeoMarket[];
}

export interface Interest2 {
    id: string;
    name: string;
}

export interface Exclusions {
    interests: Interest2[];
}

export interface CustomAudience2 {
    id: string;
    name: string;
}

export interface City2 {
    name: string;
    country: string;
    region: string;
    distance_unit: string;
    radius: number;
    key: string;
    region_id: string;
}

export interface Region2 {
    country: string;
    name: string;
    key: string;
}

export interface ExcludedGeoLocations {
    cities: City2[];
    location_types: string[];
    regions: Region2[];
}

export interface Interest3 {
    id: string;
    name: string;
}

export interface ExcludedCustomAudience {
    id: string;
    name: string;
}

export interface Targeting {
    flexible_spec: FlexibleSpec[];
    publisher_platforms: string[];
    geo_locations: GeoLocations;
    audience_network_positions: string[];
    instagram_positions: string[];
    age_min: number;
    device_platforms: string[];
    facebook_positions: string[];
    age_max: number;
    messenger_positions: string[];
    genders: number[];
    exclusions: Exclusions;
    custom_audiences: CustomAudience2[];
    excluded_geo_locations: ExcludedGeoLocations;
    interests: Interest3[];
    targeting_optimization: string;
    locales: number[];
    excluded_custom_audiences: ExcludedCustomAudience[];
    user_os: string[];
}

export interface AdSet {
    targeting: Targeting;
    id: string;
}

export interface AdSetData {
    data: AdSet[];
}
