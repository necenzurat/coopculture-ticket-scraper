import open from "open";
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';




const data = '30/05/2023';
const ora = '11:00';
const toBeParsed = 'https://ecm.coopculture.it/index.php?option=com_snapp&view=event&id=705EC694-B38F-2FD3-0D89-01869979E42C&catalogid=619C4D83-5100-83D4-1732-01869980308C&lang=en';






async function main() {
  let listEvents;
  let i = 0;
  let url = new URL(toBeParsed);

  let eventID = url.searchParams.get('id');
  let catalogID = url.searchParams.get('catalogid');

  while (true) {
  try {

      listEvents = await fetch("https://ecm.coopculture.it/index.php?option=com_snapp&task=event.getperformancelist&format=raw&id="+eventID+"&type=1&date_req="+data+"&dispoonly=1&lang=en&_=1685079701737");

      let body = await listEvents.text();
      let html = parse(body);
      let children = html.querySelectorAll('.perf_row');
      if (children.length >= 1){
        console.log(children.length);
        for (let i1 = 0; i1 < children.length; i1++){
          let child = children[i1];
          let hour = child.querySelector('div').rawText.trim();
          let tickets = child.querySelector('.brfrmnc-remaining').innerText.trim().replace(/([()])/g, '')
          let TicketsNO = 1;
          let performanceID = child.querySelector('button').getAttribute('data-performanceid');

          console.info("La ora "+ hour +" mai erau bilete "+tickets+" disponibile");

          let getProductHtml = await fetch("https://ecm.coopculture.it/index.php?option=com_snapp&task=event.getSellableProducts&format=raw&performanceId="+performanceID+"&catalogId="+catalogID+"&eventId="+eventID+"&lang=en&_=1685079869084");
          let productHtml = await getProductHtml.text();
          let checkout = parse(productHtml);

          let productID = checkout.querySelector('input').getAttribute('data-productId');

          let aprox = hour.match(ora);

         if(aprox){
           await open("https://ecm.coopculture.it/index.php?option=com_snapp&task=cart.cart"
           +"&productid="+productID
           +"&quantity="+TicketsNO
           +"&performanceid="+performanceID
           +"&catalogId="+catalogID
           +"&eventId="+eventID
           +"&format=raw&lang=en&options=");
           break;
         }
      }
  }



    } catch (e) {
        console.log(e);
    }

    i++;
  console.log(i);
  }
}
main();