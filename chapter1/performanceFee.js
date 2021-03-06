function statement(invoice, plays) {
    let totalAmount = 0;
    let volumneCredits = 0;

    let result = `청구 내역( 고객명 :${invoice.customer})\n`;

    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for(let perf of invoice.performances){
        const play = plays[perf.playId];
        let thisAmount = amountFor(perf,play);
        //포인트를 적립한다.
        volumneCredits += Math.max(perf.audience - 30,0);

        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if("comedy" === play.type ) volumneCredits += Math.floor(perf.audience /5 ) ;

        // 청구 내역을 출력한다.
        result += `${play.name}: ${format(thisAmount/ 100 )} (${perf.audience}석)\n`;
    }
    result += `총액: ${format(thisAmount/ 100 )}`
    result += `적립 포인트: ${volumneCredits}점 \n `;
    return result;
}

function amountFor(perf,play){
    let thisAmount = 0;
    switch(play.type){
        case "tragedy": // 비극
            if(perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comdey":
            thisAmount = 3000;
            if(perf.audience > 20 ) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
    }
    return thisAmount;
}
