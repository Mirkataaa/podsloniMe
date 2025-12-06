interface GeoResult {
  address: string;
  district?: string;
}

export const getAddressFromCoordinates = async (
  lat: number,
  lng: number,
): Promise<GeoResult> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=bg`,
    );

    if (!res.ok) throw new Error('Geocoding error');

    const data = await res.json();
    const addr = data.address || {};

    let road = addr.road || '';

    if (road && addr.house_number) {
      road += ` №${addr.house_number}`;
    }

    if (!road) {
      road =
        addr.suburb ||
        addr.neighbourhood ||
        addr.pedestrian ||
        addr.village ||
        addr.city ||
        '';
    }

    return {
      address: road,
      district: addr.suburb || addr.neighbourhood,
    };
  } catch (error) {
    console.error(error);
    return { address: '' };
  }
};
