export type BattleType = 'bronze' | 'silver' | 'gold';

export const generateBattleId = (battleType: BattleType): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${battleType}-${timestamp}-${randomSuffix}`;
};

export const getBattleTypeFromTitle = (title: string): BattleType => {
  const type = title.split(' ')[0].toLowerCase() as BattleType;
  return type;
}; 