import _ from 'lodash';
import crypto from 'crypto';

export class Utils {
  static isStringEmpty(str: any): boolean {
    return str === undefined || str === null || str === '';
  }
  static md5(contents: string): string {
    return crypto.createHash('md5').update(contents).digest('hex');
  }

  static removeSpaces = (input: string): string => {
    return input?.replace(/\s/g, '');
  };

  static mapModifiedDataRequest = (request: any, data: any): any => {
    const keys = Object.keys(request);
    const dataObject = keys.map((key) => {
      return { [key]: data[key] };
    });
    const requestObject = keys.map((key) => {
      return { [key]: request[key] };
    });

    return {
      requestObject: Object.assign({}, ...requestObject),
      dataObject: Object.assign({}, ...dataObject),
    };
  };

  /**
   * snake case object key
   * @param obj
   */
  static snakeCaseKey(obj: { [x: string]: any }): { [x: string]: any } {
    if (typeof obj != 'object') return obj;

    for (const oldName in obj) {
      // Camel to underscore
      const newName = _.snakeCase(oldName);

      // Only process if names are different
      if (newName != oldName) {
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (obj.hasOwnProperty(oldName)) {
          obj[newName] = obj[oldName];
          delete obj[oldName];
        }
      }

      // Recursion
      if (typeof obj[newName] == 'object') {
        obj[newName] = Utils.snakeCaseKey(obj[newName]);
      }
    }
    return obj;
  }

  /**
   * make a delay for milisecond before continue to next process
   * @param milisecond
   */
  static takeDelay(milisecond: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, milisecond);
    });
  }

  /**
   * count pagination offset
   * @param {number} page
   * @param {number} perPage
   * @returns {number}
   */
  static countOffset(page?: number, perPage?: number): number {
    page = page ?? 1;
    perPage = perPage ?? 10;

    return (page - 1) * perPage;
  }

  /**
   * find the next occurance date of the day specified
   * ex. startingDate is friday 2021-09-10
   * then the next monday is on 2021-09-13
   * @param startingDate the starting date
   * @param nearestDay the day expected in number (0 - 6)
   * @returns {Date}
   */
  static dateOfNearestDay(startingDate: Date, nearestDay: number): Date {
    const nearestTime = new Date(startingDate.getTime());

    if (startingDate.getDay() == 6 && nearestDay == 5) {
      nearestTime.setDate(
        startingDate.getDate() +
          ((7 + nearestDay - startingDate.getDay()) % 7) -
          7,
      );
    } else {
      nearestTime.setDate(
        startingDate.getDate() + ((7 + nearestDay - startingDate.getDay()) % 7),
      );
    }

    return nearestTime;
  }
}
