import logos from '../../public/assets/logos';

export const getTeamLogo = name => {
  const logo = logos[name];

  return logo;
};
