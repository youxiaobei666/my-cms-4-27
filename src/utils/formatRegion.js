const formatRegion = (data) => {
  const { province, city, area } = data;

  // 将城市添加到对应省份
  const provinceWithCities = province.map((prov) => {
    return {
      ...prov,
      children: city.filter((ct) => ct.parentId === prov.code),
    };
  });

  // 将区县添加到对应城市
  const options = provinceWithCities.map((prov) => {
    const cities = prov.children.map((ct) => {
      return {
        ...ct,
        children: area.filter((ar) => ar.parentId === ct.code),
      };
    });

    return {
      value: prov.name,
      label: prov.name,
      children: cities.map((ct) => ({
        value: ct.name,
        label: ct.name,
        children: ct.children.map((ar) => ({
          value: ar.name,
          label: ar.name,
        })),
      })),
    };
  });

  return options;
}

export default formatRegion