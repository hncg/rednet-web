function get_series(moods, feel) {
    data = [];
    max_min = {max: 2000, min: -2000};
    for (i in moods) {
        value = moods[i][feel];
        max_min['max'] = max_min['max'] > value ? max_min['max'] : value;
        max_min['min'] = max_min['min'] < value ? max_min['min'] : value;
        if(!data) {
            data = [{name: moods[i].city, value: value}];
        } else {
            data = data.concat([{name: moods[i].city, value: value}]);
        }
    };
    if(max_min['max'] > -max_min['min']) {
        max_min = max_min
    }
    eage = max_min['max'] > -max_min['min'] ? max_min['max'] : -max_min['min'];

    return {data: data, eage: eage};
}
