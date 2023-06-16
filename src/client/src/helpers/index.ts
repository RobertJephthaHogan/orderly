
// Takes an array of objects and a property name, and returns an object with groupings for each 
export const groupByProperty = (arrayOfObjects: any, property: any) => {
    return arrayOfObjects.reduce((acc : any, curr : any) => {
      const key = curr[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
}

// Takes an array of objects and a string and returns on array of the objects containing the search string
export const filterByValue = (array: any, string: any) => {
  return array.filter((o: any) =>
      Object.keys(o).some((k: any) =>
          o[k].toString().toLowerCase().includes(string.toLowerCase())
      )
  )
}

// Does what you think it does
export const generateId = () => {
  return `${Math.floor(Math.random() * 1000000)}`
}


export function arrayRemove(arr: any, value: any) { 
  return arr.filter(function(ele: any){ 
      return ele != value; 
  });
}


        
export function datesMatch(date1: any, date2: any) {
  return date1.getFullYear() === date2.getFullYear() 
    && date1.getMonth() === date2.getMonth() 
    && date1.getDate() === date2.getDate();
}