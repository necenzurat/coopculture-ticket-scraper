import open from "open";
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

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
      response = await fetch("https://ecm.coopculture.it/index.php?option=com_snapp&task=event.getperformancelist&format=raw&id=3C38AB77-8D5A-5394-05B2-0172EB8E7D46&type=1&date_req=30/03/2023&dispoonly=1&lang=en&_=1678676357632");


      let body = await response.text();
      let html = parse(body);

      const children = html.querySelectorAll('.perf_row');

      for (let i1 = 0; i1 < children.length; i1++){
        const child = children[i1];
         const hour = child.querySelector('div').rawText.trim();

         const tickets = child.querySelector('.brfrmnc-remaining').innerText.trim().replace(/([()])/g, '')

         const performanceid = child.querySelector('button').getAttribute('data-performanceid');

         console.log(hour, tickets, performanceid);

        const aprox = hour.match('17');

         if(aprox){
           await open("https://ecm.coopculture.it/index.php?option=com_snapp&task=cart.cart"
           +"&productid=12837B39-8EA6-E674-075D-0172EB8E8A52"
           +"&quantity="+tickets
           +"&performanceid="+performanceid
           +"&catalogId=F3CB77BD-6A43-108B-6723-0174490EB610&"
           +"&eventId=3C38AB77-8D5A-5394-05B2-0172EB8E7D46&"
           +"&format=raw&lang=en&options=");
           break;
         }
      }

    } catch (e) {
        console.log(e);
    }

    i++;
    await wait(500);
  }

}
main();
