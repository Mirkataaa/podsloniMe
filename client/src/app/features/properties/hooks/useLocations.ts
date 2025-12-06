import { useCallback, useMemo } from 'react';
import ekatteData from '../../../../data/ek_atte.json';

type EkatteEntry = {
  ekatte: string;
  t_v_m: string;
  name: string;
  oblast: string;
  oblast_name: string;
  obshtina: string;
  obshtina_name: string;
};

const locations = ekatteData as EkatteEntry[];

export function useLocations() {
  const regions = useMemo(() => {
    return Array.from(new Set(locations.map((l) => l.oblast_name)))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ name }));
  }, []);

  const getMunicipalities = useCallback((regionName: string) => {
    if (!regionName) return [];

    const filtered = locations.filter((l) => l.oblast_name === regionName);
    const municipalities = Array.from(
      new Set(filtered.map((l) => l.obshtina_name)),
    ).sort((a, b) => a.localeCompare(b));

    return municipalities.map((name) => ({ name }));
  }, []);

  const getSettlements = useCallback(
    (regionName: string, municipalityName: string) => {
      if (!regionName || !municipalityName) return [];

      const filtered = locations.filter(
        (l) =>
          l.oblast_name === regionName && l.obshtina_name === municipalityName,
      );

      return filtered
        .map((l) => ({
          name: `${l.t_v_m} ${l.name}`,
          ekatte: l.ekatte,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    [],
  );

  const getDistricts = useCallback(() => {
    return [];
  }, []);

  return {
    regions,
    getMunicipalities,
    getSettlements,
    getDistricts,
  };
}
