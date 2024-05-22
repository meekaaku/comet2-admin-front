import * as currency from 'currency.js';



// Formats a number to user's locale
export function formatNumber(n: number|string, decimals: number = 2) {
	const formatter = new Intl.NumberFormat('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	n = Number(n);
	return formatter.format(n);
}


export function formatDate(str: string)
{
  const dt = new Date(str)
  return dt.toLocaleDateString();
}

export function formatAddress(str: string)
{
  return str.replaceAll('\n', '<br />')
}

export function splitAndTrim(str: string, delimiter = ','): string[]
{
    return str.split(delimiter).map(s => s.trim());
}   

function toClassName(value: any) {
  let result = '';

  if (typeof value === 'string' || typeof value === 'number') {
    result += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(' ');
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += ' ');
          result += key;
        }
      }
    }
  }

  return result;
}

export function classnames(...args: any[]) {
  return args.map(toClassName).filter(Boolean).join(' ');
}

export function discountPercent(base: string|number, net: string|number): string
{
	return String(Math.round((1 - Number(net)/Number(base)) * 100));
}

export function replaceURLQuery(values: Record<string, string>)
{
  const url = new URL(window.location.toString());
  for (let [k, v] of Object.entries(values)) {
    if (!!v) {
      url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState({}, '', url);
};

