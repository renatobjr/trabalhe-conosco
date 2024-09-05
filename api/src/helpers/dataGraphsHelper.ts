const dataGraphsHelper = {
  calculateCulturesData: (cultures: any) => {
    const allCultures = cultures.reduce(
      (acc: string | any[], producer: any) => {
        return acc.concat((producer as any).cultures);
      },
      []
    );

    const cultureCount: { [key: string]: number } = {};

    allCultures.forEach((culture: string | number) => {
      cultureCount[culture] = (cultureCount[culture] || 0) + 1;
    });

    const totalCultures = allCultures.length;

    return Object.entries(cultureCount)
      .map(([culture, count]) => ({
        culture,
        count,
        percentage: ((count / totalCultures) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count);
  },
  calculateAreasData: (farmsByArea: any, totalArea: number) => {
    const areaStats = farmsByArea.reduce(
      (
        acc: { totalAreaCultivated: any; totalAreaForest: any; totalArea: any },
        producer: any
      ) => {
        acc.totalAreaCultivated += (producer as any).total_area_cultivated;
        acc.totalAreaForest += (producer as any).total_area_forest;
        acc.totalArea += (producer as any).total_area;
        return acc;
      },
      { totalAreaCultivated: 0, totalAreaForest: 0, totalArea: 0 }
    );

    const totalAreaCultivatedPercent = (
      (areaStats.totalAreaCultivated / totalArea) *
      100
    ).toFixed(2);
    const totalAreaForestPercent = (
      (areaStats.totalAreaForest / totalArea) *
      100
    ).toFixed(2);

    return [
      {
        total_area_cultivated: {
          count: areaStats.totalAreaCultivated,
          percentual: `${totalAreaCultivatedPercent}%`,
        },
      },
      {
        total_area_forest: {
          count: areaStats.totalAreaForest,
          percentual: `${totalAreaForestPercent}%`,
        },
      },
    ];
  },
};

export default dataGraphsHelper;
