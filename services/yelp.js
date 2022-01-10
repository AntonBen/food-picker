
export const getResturants = () => {
 const dataPromise = new Promise((res,rej) => {
   res([
    {
    distance: 675.0770786690107,
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/Bx3QYClk_yKcw6G8zHGWVQ/o.jpg",
    name: "Pharmarium",
    price: "$$",
    rating: 4,
  },
     {
    distance: 1081.6788379841437,
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/UOSD_cdeKPtKhUerL3eu3w/o.jpg",
    name: "Blå Dörren",
    price: "$$",
    rating: 4,
  },
   {
    distance: 1436.3239358480553,
    image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/1tSdNjs4xT22KsipvOpKZg/o.jpg",
    name: "Flippin' Burgers",
    price: "$$",
    rating: 4,
  },
])
 })

  return dataPromise

    return fetch('https://europe-west1-restaurants-tinder.cloudfunctions.net/food-api/restaurants?location=stockholm')
    .then(response => response.json)
    .catch(err => console.log(err))
}