import React from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import { UseOrdersData } from "../Orders/Orders";
import { UseProductsData } from "../Products/Products";
import Card from "../Card/Card";

const Cards = () => {
  const { revenue, revenueSeries, loss, lossSeries } = UseOrdersData();
  const { expenses, expensesSeries } = UseProductsData();

  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        // Check if the card title is "Revenue" or "Loss"
        const isRevenueCard = card.title === 'Revenue';
        const isLossCard = card.title === 'Loss';
        const isExpenseCard = card.title === 'Expenses';

        // Conditionally set value and series
        const value = isRevenueCard
          ? revenue.toFixed(2)
          : isLossCard
          ? loss.toFixed(2)
          : isExpenseCard
          ? expenses.toFixed(2)
          : card.value;
          
        const series = isRevenueCard
          ? [{ name: "Revenue", data: revenueSeries }]
          : isLossCard
          ? [{ name: "Loss", data: lossSeries }]
          : isExpenseCard
          ? [{ name: "Expense", data: expensesSeries }]
          : card.series;

        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={value}
              png={card.png}
              series={series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
