class Utils {
  public static getUrlPattern = (market: string): string => {
    switch (market) {
      case 'coingecko':
        return '?vs_currency=:vsCurrency&order=:order&per_page=:perPage&page=:page&sparkline=:sparkline&price_change_percentage=:priceChangePercentage';
      default:
        return '';
    }
  };

  public static setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, value);
  };

  public static getLocalStorage = (key: string): any | null => {
    return localStorage.getItem(key);
  };
}

export default Utils;
