export const retriveListingFilterValues = (listing, fieldName, type) => {
  if (listing) {
    let data = JSON.parse(listing[fieldName]);

    const transformedData = Object.entries(data).map(([label, options]) => {
      const labelName = label.split(' ')[0];
      return {
        label: labelName,
        options: options.map((option) => ({ value: type, label: option })),
      };
    });
    return transformedData;
  } else {
    return [];
  }
};

export const featuresFilter = (listing) => {
  if (listing[0]?.Voorzieningen) {
    const activitiesData = JSON.parse(listing[0]?.Voorzieningen);

    const newActivities = Object.entries(activitiesData).map(
      ([label, options]) => {
        const labelName = label.split(' ')[0];
        return {
          label: labelName,
          options: options?.map((option) => ({
            value: 'Voorzieningen',
            label: option,
          })),
        };
      }
    );
    return newActivities;
  }
};

export const featuresAllFilter = (listing, myLabel) => {
  let filteredArr = [];
  if (listing) {
    const data = listing.map((item) => item[myLabel]);
    data.map((item) => {
      if (item) {
        const res = JSON.parse(item);
        const objFilter = Object.entries(res)
          .map(([label, second]) => {
            const nlabel = label.split(' ')[0];
            if (Array.isArray(second)) {
              return {
                label: nlabel,
                options: second.map((item) => ({
                  value: myLabel,
                  label: item,
                })),
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        if (objFilter.length > 0) {
          filteredArr.push(objFilter);
        }
      }
    });
    const flatterArr = filteredArr.reduce(
      (accum, val) => accum.concat(val),
      []
    );
    return flatterArr;
  }
};

export const activitiesFilter = (listing) => {
  if (listing[0]?.Activiteiten) {
    const activitiesData = JSON.parse(listing[0]?.Activiteiten);

    const newActivities = Object.entries(activitiesData).map(
      ([label, options]) => {
        const labelName = label.split(' ')[0];
        return {
          label: labelName,
          options: options?.map((option) => ({
            value: 'Activiteiten',
            label: option,
          })),
        };
      }
    );
    return newActivities;
  }
};
export const retriveListingFilterCatagories = (type) => {
  let listData = [
    { value: type, label: 'Binnenbad' },
    { value: type, label: 'Binnen - en Buitenbad' },
    // { value: type, label: 'Subtropisch Zwembad' },
    { value: type, label: 'Zwemschool (Particulier)' },
  ];

  return listData;
};
