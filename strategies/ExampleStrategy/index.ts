import $ from '../../core/services/Helpers';
import Strategy from '../../core/models/Strategy';
import store from '../../core/store';

/**
 * A strategy written to be used at 'backtest.test.ts'.
 * If you're looking for an example strategy to 
 * copy from, check out 'ExampleStrategy.ts'.
 *
 * @export
 * @class ExampleStrategy
 * @extends {Strategy}
 */
export default class ExampleStrategy extends Strategy {
    time: string; 

    constructor() {
        super('An example strategy', '0.0.2', 0);
    }

    async update() {
        this.time = store.getState().mainReducer.currentTime;
    }

    /**
     * trade #1: 
     * A failing trade that gets closed with the stopLoss order. 
     *
     * @returns {boolean}
     * @memberof ExampleStrategy
     */
    shouldBuy(): boolean {
        if (this.time === $.transformTimestamp(1547200800000)) {
            return true; 
        }

        return false; 
    }

    /**
     * trade #2 
     * A winning trade that is closed with the takeProfit order. 
     * notice that in this trade is very short-lived. In fact,
     * it's opened and closed inside the very same 5m candle. 
     * Notice that this is even done via a LIMIT order thanks 
     * to Jesse's ability to trade on forming-candles. 
     *
     * @returns {boolean}
     * @memberof ExampleStrategy
     */
    shouldSell(): boolean {
        if (this.time === $.transformTimestamp(1547203500000)) {
            return true;
        }

        return false;
    }

    async executeBuy(): Promise<void> {
        this.openPositionOrder = await this.trader.buyAt(10.2041, 129.33);
        this.stopLossPrice = 128.35;
        this.takeProfitPrice = 131.29; 
    }

    async executeSell(): Promise<void> {
        this.openPositionOrder = await this.trader.sellAt(10, 128.05);
        this.stopLossPrice = 128.52;
        this.takeProfitPrice = 126.58; 
    }

    shouldCancel(): boolean {
        return false;
    }
    shouldWait(): boolean {
        return false;
    }

    // uncomment if the parent class's implementation isn't enough
    // async onStopLoss() {}

    // uncomment if the parent class's implementation isn't enough
    // async onTakeProfit() {}

    // fill only if needed. If not, leave it be (but don't remove it)
    // async onIncreasedPosition() {}

    // fill only if needed. If not, leave it be (but don't remove it)
    // async onReducedPosition() {}
}
