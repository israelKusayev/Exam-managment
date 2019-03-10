export class Utils {
  static groupBy(array: any[], columns: string[]): any {
    const groups = {};
    const groupByFieldsFunc = element =>
      columns.reduce((acc, column) => {
        const ret = acc.concat([element[column]]);
        delete element[column];
        return ret;
      }, []);
    array.forEach(function(elem) {
      const element = JSON.parse(JSON.stringify(elem));
      const group = JSON.stringify(groupByFieldsFunc(element));
      groups[group] = groups[group] || [];
      groups[group].push(element);
    });
    return groups;
  }

  static groupByIntoArray(
    array: any[],
    columns: string[],
    DetailsColumn: string
  ): any[] {
    const grouped = Utils.groupBy(array, columns);
    const retval: any[] = [];
    for (const x of Object.keys(grouped)) {
      const arrKey = JSON.parse(x);
      const obj: any = {};
      for (let i = 0; i < arrKey.length; i++) {
        obj[columns[i]] = arrKey[i];
      }
      obj[DetailsColumn] = grouped[x];
      retval.push(obj);
    }
    return retval;
  }
}
