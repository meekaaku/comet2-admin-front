export async function load({ setHeaders })
{
  console.log('load server');
  setHeaders({
    'max-age': '30',
  })
}