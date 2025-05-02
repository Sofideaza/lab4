import poniesData from '../data/ponies.json';

export interface CharacterInfo {
  id: number;
  name: string;
  race: string;
  description: string;
  avatar: string;
}

const ponies: CharacterInfo[] = poniesData as CharacterInfo[];

export const CHARACTER_INFO: Record<number, CharacterInfo> = ponies.reduce(
  (map, pony) => {
    map[pony.id] = pony;
    return map;
  },
  {} as Record<number, CharacterInfo>
);