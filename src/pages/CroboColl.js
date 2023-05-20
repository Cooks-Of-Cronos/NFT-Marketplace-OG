import React from "react";

const data = [
    { name: "Total Volume (in CRO)", value: "1,000" },
    { name: "$cGOLD Locked", value: "60,000" },
    { name: "Total Sales", value: "10" },
    { name: "Active Listings", value: "10" },
];

const Statistics = () => {
    return (
        <div className="statistics">
            {data.map((item) => (
                <div key={item.name} className="statistic-item">
                    <h2>{item.value}</h2>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Statistics;
