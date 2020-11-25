export class Utils {
  private static _id: number = -1;
  private static _url: string = "http://3.135.235.180:8080/api/";

  public static setId = (value: number) => {
    Utils._id = value;
  };

  public static getId = (): number => {
    return Utils._id;
  };

  public static getUrl = (): string => {
    return Utils._url;
  };
}
