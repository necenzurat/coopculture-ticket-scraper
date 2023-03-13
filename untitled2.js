import axios from "axios";
import open from "open";

function wait(time = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done!");
    }, time);
  });
}

async function main() {
  let response;
  let i = 0;
  while (true) {
    try {
      const response = await axios.get('https://ecm.coopculture.it/index.php?option=com_snapp&task=event.getperformancelist&format=raw&id=3C38AB77-8D5A-5394-05B2-0172EB8E7D46&type=1&date_req=13/03/2023&dispoonly=1&lang=en&_=1678676357632');
  
    console.log(response);


    } catch (e) {
      console.log(e);
    }

    const match = response.data.match('13:35');

    if (match) {
     

      console.log("found free ticket :)");
     
      // await open("https://ecm.coopculture.it/index.php?option=com_snapp&task=cart.cart&productid=12837B39-8EA6-E674-075D-0172EB8E8A52&quantity=6&performanceid=AFF88A35-4DB4-FD7A-1008-018603814843&options=&catalogId=F3CB77BD-6A43-108B-6723-0174490EB610&eventId=3C38AB77-8D5A-5394-05B2-0172EB8E7D46&format=raw&lang=en");
      // break;
    }
    console.log("not found free ticket :(" + i);
    i++;
    await wait(3000);
  }

  console.log();
}
main();
