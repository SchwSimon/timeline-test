import { createSelector } from 'reselect';

const getTimelineDataPool = state => state.timeline.dataPool;
const getSelectedDataType = state => state.timeline.selectedDataType;

  // Returns only the selected datatype's data
export const getTimelineData = createSelector(
  [getTimelineDataPool, getSelectedDataType],
  (data, type) => {
    if (data[type])
      return data[type];

    const typeKeys = Object.keys(data);
    if (!typeKeys.length)
      return null;

    const mergedData = typeKeys.map(() => []);

    typeKeys.forEach(type => {
      data[type].forEach((entries, index) => {
        mergedData[index] = mergedData[index].concat(entries);
      });
    });

    return mergedData;
  }
);
